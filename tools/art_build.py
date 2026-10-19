"""Turn reference photos into EGA-palette sprites (digitized 1990 look) -> src/art.js, plus a contact sheet to eyeball."""
import io, os, glob, json
from PIL import Image
REF = r"P:/Portable/Claude Code Projects/261015 MPPC Oregon Trail/reference"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "art.js")
SHEET = os.path.join(HERE, "art_sheet.png")
EGA = [(0,0,0),(0,0,170),(0,170,0),(0,170,170),(170,0,0),(170,0,170),(170,85,0),(170,170,170),
       (85,85,85),(85,85,255),(85,255,85),(85,255,255),(255,85,85),(255,85,255),(255,255,85),(255,255,255)]
pal = Image.new("P",(1,1)); flat=[]; [flat.extend(c) for c in EGA]; pal.putpalette(flat+[0]*(768-len(flat)))

def load(path):
    im = Image.open(path).convert("RGB"); return im
def crop_frac(im, x0,y0,x1,y1):
    w,h = im.size; return im.crop((int(x0*w),int(y0*h),int(x1*w),int(y1*h)))
GRAYS=[0,8,7,15]; STONE=[0,8,7,15,6,1,9,3,11,2,10,14]; FULL=list(range(16))
def make_pal(idx):
    p=Image.new("P",(1,1)); fl=[]
    for i in idx: fl.extend(EGA[i])
    p.putpalette(fl+[0]*(768-len(fl))); return p
def to_rows(im, w, h, dither=True, contrast=1.0, bright=1.0, allow=None, transparent=False, flip=False, gray=False):
    from PIL import ImageEnhance, ImageOps
    im = im.resize((w,h), Image.LANCZOS)
    if flip: im = ImageOps.mirror(im)
    if gray: im = ImageOps.grayscale(im).convert("RGB")
    if contrast!=1.0: im = ImageEnhance.Contrast(im).enhance(contrast)
    if bright!=1.0: im = ImageEnhance.Brightness(im).enhance(bright)
    allow = allow or FULL
    q = im.quantize(palette=make_pal(allow), dither=Image.FLOYDSTEINBERG if dither else Image.NONE)
    px = q.load(); src=im.load()
    mask=set()
    if transparent=="sky":  # any bright bluish pixel is sky
        for y in range(h):
            for x in range(w):
                r,g,b=src[x,y]
                if b>r+12 and b>=g and (r+g+b)>330: mask.add((x,y))
    elif transparent:  # flood from the four corners over pixels close to the corner colour
        from collections import deque
        for cx,cy in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]:
            c0=src[cx,cy]; dq=deque([(cx,cy)]); seen=set()
            while dq:
                x,y=dq.popleft()
                if (x,y) in seen or x<0 or y<0 or x>=w or y>=h: continue
                seen.add((x,y)); c=src[x,y]
                if sum(abs(c[i]-c0[i]) for i in range(3))>90: continue
                mask.add((x,y)); dq.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])
    rows=[]
    for y in range(h): rows.append("".join("." if (x,y) in mask else "%X"%allow[px[x,y]] for x in range(w)))
    return rows

def find(folder, needle):
    for f in glob.glob(os.path.join(REF, folder, "*")):
        if needle.lower() in os.path.basename(f).lower(): return f
    return None

art = {}
# ---- buildings / scenes (name: file, crop fractions, size) ----
scenes = [
  # name, file, crop box, size, contrast, allowed palette, transparent, flip
  ("sanct_front", os.path.join(REF,"Sanctuary.JPG"), (0.28,0.10,0.80,0.86), (64,72), 1.1, STONE, "sky", False),
  ("tower", os.path.join(REF,"Belltower (flatten to 2d).JPG"), (0.57,0.06,0.79,0.80), (24,56), 1.1, STONE, "sky", False),
  ("church1927", os.path.join(REF,"Postcard of MPPC original sanctuary - Courtesy of Atkins Libaray Special Collections.JPG"), (0.12,0.04,0.90,0.76), (112,56), 1.3, GRAYS, False, False),
  ("clc1990", os.path.join(REF,"1990 Christian Life Center Complete.jpg"), (0.05,0.18,0.67,0.94), (72,64), 1.2, GRAYS, False, False),
  ("outreach2011", os.path.join(REF,"2011 04 29 Outreach Center.JPG"), (0.10,0.17,0.98,0.60), (112,40), 1.1, STONE, False, False),
  ("welcome2012", os.path.join(REF,"Welcome Center (Constructed 2008ish).JPG"), (0.30,0.12,0.76,0.90), (56,64), 1.1, STONE, False, False),
  ("edbuilding1941", os.path.join(REF,"B Building.JPG"), (0.13,0.05,0.70,0.95), (56,72), 1.1, STONE, "sky", False),
  ("children1951", glob.glob(os.path.join(REF,"1951*"))[0], (0.08,0.44,0.90,0.74), (112,32), 1.0, STONE, False, False),
  ("bus", os.path.join(REF,"Minibus.webp"), (0.01,0.12,0.62,0.58), (72,36), 1.1, [0,8,7,15,1,9,3,11,14], True, True),
  ("interior", os.path.join(REF,"Sanctuary interior (pulput at right).jpg"), (0,0,1,1), (160,82), 1.15, FULL, False, False),
  ("skyline", os.path.join(REF,"Charlotte Skyline 2.webp"), (0,0.30,1,0.72), (320,48), 1.2, [0,8,7,15,1,9,3,11,14,6], False, False),
  ("hugh", find("Historic figures","McManaway"), (0.0,0.0,0.55,1.0), (32,48), 1.2, GRAYS, False, False),
]
for name, path, box, size, con, allow, tr, fl in scenes:
    im = crop_frac(load(path), *box); art[name] = to_rows(im, size[0], size[1], True, con, 1.0, allow, tr, fl)

# ---- pastor faces 32x32 ----
faces = {}
pastor_files = {"gammon":"Gammon","jones":"Jones","fogartie":"Fogartie","taylor":"Taylor","croft":"Croft","swicegood":"Swicegood","eason":"Eason","clifford":"Clifford"}
face_box = {"gammon":(0.30,0.05,0.72,0.42),"jones":(0.22,0.04,0.62,0.44),"fogartie":(0.30,0.03,0.72,0.47),"taylor":(0.28,0.05,0.72,0.47),
            "croft":(0.28,0.05,0.72,0.48),"swicegood":(0.30,0.05,0.72,0.47),"eason":(0.30,0.04,0.72,0.46),"clifford":(0.28,0.04,0.74,0.56)}
for pid, needle in pastor_files.items():
    f = find("pastors", needle); faces[pid] = to_rows(crop_frac(load(f), *face_box[pid]), 32, 32, False, 1.4, 1.1, GRAYS, False, False, True)
faces["jennifer"] = to_rows(crop_frac(load(os.path.join(REF,"Other staff","Jennifer Childers.jpg")), 0.22,0.02,0.80,0.62), 32,32, False, 1.4, 1.1, GRAYS, False, False, True)

# ---- party faces 24x24 (name -> file needle in folder) ----
party = {
  "George E. Wilson":("Historic figures","1929 05 05 George Wilson"), "David Ovens":("Historic figures","David Ovens"), "J. Norman Pease":("Historic figures","Pease"),
  "J. Cecil Lawrence":("Other staff","Cecil Lawrence"), "Eleanor Belk":("Historic figures","1951 Eleanor Belk"), "Gladys Tillett":("Historic figures","Gladys Tillett"), "Victor Shaw":("Historic figures","1953_01_28 Victor Shaw"),
  "A. Clarke Dean":("Other staff","Clarke Dean"), "Eugene Daniel Jr.":("Other staff","Eugene L Daniel"), "Tom Belk":("Historic figures","John Belk"),
  "Pete Peery":("Historic figures","1976 Pete Peery"), "Margaret Peery":("Historic figures","1976 Margaret Peery"), "Bill McLean":("Other staff","McLean"),
  "Jane Summey":("Other staff","Summey"), "Ray Scott":("Other staff","Raymond D. Scott"), "Tyler Downing":("Other staff","Downing"), "Lib Harkey":("Historic figures","Lib Harkey"),
  "Peter Henry":("Other staff","Peter J M Henry"), "Von":("Other staff","Von Clemans - AP - color"), "Charles MacDonald":("Other staff","MacDonald - AP.jpg"), "Julius Melton":("Other staff","Julius Melton.jpg"),
  "Millie Snyder":("Other staff","Millie Snyder - AP-EP.jpg"), "Deborah Conner":("Other staff","Conner - AP - color"), "Rebecca Davis":("Other staff","Davis - AP - Color"),
  "Michelle Thomas-Bush":("Other staff","Thomas-Bush - AP.jpg"), "John Magnuson":("Other staff","Magnuson"), "Lisa Hickman":("Other staff","Hickman"),
}
pfaces = {}
for name,(folder,needle) in party.items():
    f = find(folder, needle)
    if not f: print("missing", name); continue
    im = load(f); w,h = im.size
    # headshots: take the upper-middle; wide newspaper crops: middle
    box = (0.25,0.03,0.75,0.5) if h>=w*0.9 else (0.3,0.0,0.7,0.9)
    pfaces[name] = to_rows(crop_frac(im,*box), 24, 24, False, 1.5, 1.2, GRAYS, False, False, True)
# Tom Belk uses John Belk's photo as a stand-in (brother); flag it
missing = [n for n in party if n not in pfaces] + ["Thomas Glasgow","Robert Stigall","Bill White Jr.","Dale Allison"]
print("no photo for:", missing)

js = "// Generated by art_build.py from reference/ photos. Rows of EGA palette indices.\nconst ART = " + json.dumps(art) + ";\nconst FACES = " + json.dumps(faces) + ";\nconst PFACES = " + json.dumps(pfaces) + ";\n"
io.open(OUT,"w",encoding="utf-8",newline="\n").write(js)
print("art.js bytes:", len(js))

# ---- contact sheet ----
def render(rows, scale):
    h=len(rows); w=len(rows[0]); im=Image.new("RGB",(w*scale,h*scale),(255,0,255)); px=im.load()
    for y in range(h):
        for x in range(w):
            if rows[y][x]==".": continue
            c=EGA[int(rows[y][x],16)]
            for dy in range(scale):
                for dx in range(scale): px[x*scale+dx,y*scale+dy]=c
    return im
nod = {pid: to_rows(crop_frac(load(find("pastors",n)), *face_box[pid]), 32, 32, False, 1.4, 1.1, GRAYS, False, False, True) for pid,n in pastor_files.items()}
tiles=[render(r,3) for r in art.values()] + [render(r,3) for r in faces.values()] + [render(r,3) for r in nod.values()] + [render(r,3) for r in pfaces.values()]
W=1400; x=y=0; rowh=0; sheet=Image.new("RGB",(W,1400),(40,40,40))
for t in tiles:
    if x+t.width>W: x=0; y+=rowh+6; rowh=0
    sheet.paste(t,(x,y)); x+=t.width+6; rowh=max(rowh,t.height)
sheet=sheet.crop((0,0,W,y+rowh)); sheet.save(SHEET); print("sheet", sheet.size)
