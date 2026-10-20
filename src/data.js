// ============================================================
// THE MYERS PARK TRAIL - CONTENT DATA
// Everything a non-programmer might edit lives in this file.
// Page numbers are book pages in "A Legacy of Love" (Stickell, 2026).
// ============================================================

const DATA = {};

// Logging: paste the Apps Script web app URL here (see tools/apps-script/README.md). Empty = never send.
DATA.config = { sheetUrl:"", build:"kiosk" };

DATA.title = "THE MYERS PARK TRAIL";
DATA.subtitle = "Can you guide the church to 100 years?";

DATA.about = [
  "You are one of the pastors of Myers Park Presbyterian Church. Drive the church mini-bus from the early days meeting at the Queens College chapel all the way to Centennial Sunday in 2026.",
  "Keep the church healthy by managing: the Funds, the Members, the congregation's Morale, Participation in the life of the church, and your own Stamina. If Funds, Members, Morale or Stamina run out, or all your leaders leave, your tenure ends.",
  "Every so often, you'll have the opportunity to meet a big need in the life of the church and the community. Building projects need cash: stop along the way and hold a stewardship drive to save up.",
  "Your score counts members, funds, morale, participation, leaders still aboard and campaigns paid in cash.",
  "The history is true, drawn from \"A Legacy of Love\" by Lois Stickell. A few small events are invented for fun."
];

// ---------- PASTORS ----------
// stats are the mechanics values, 1-10. On screen they read 11-20 (a base of 10 for everyone).
// p=Preaching g=Gravitas c=Charisma v=Vision s=Stamina
DATA.pastors = [
  { id:"gammon", name:"Edgar Gammon", short:"Gammon", years:"1927-39", p:7,g:9,c:7,v:8,s:4, mult:2,
    trait:"Declined Twice", traitText:["Starts with Morale 90 (they begged).","Blows to Stamina land double."],
    quote:"Understandably didn't want to move two states away for a church that had no lot, no building, and no plan for either.", initials:"EGG",
    party:[["Thomas Glasgow","Elder"],["Hunter Marshall Jr.","Clerk of Session"],["David Ovens","Early Leader"],["J. Norman Pease","Building Committee"]] },
  { id:"jones", name:"James A. Jones", short:"Jones", years:"1939-55", p:9,g:5,c:8,v:8,s:5, mult:2,
    trait:"Jazz A.", traitText:["A longer Sermon Burst in the drive.","Session votes things while you travel."],
    quote:"He once mended a groomsman's broken tuxedo with a rubber band moments before a wedding. (p.114)", initials:"JAJ",
    party:[["J. Cecil Lawrence","Assoc. Pastor"],["Eleanor Belk","Staff"],["Gladys Tillett","Elder"],["Victor Shaw","Elder"]] },
  { id:"fogartie", name:"James Fogartie", short:"Fogartie", years:"1955-74", p:7,g:5,c:9,v:5,s:9, mult:1,
    trait:"How Great Thou Art", traitText:["Once a decade, sing to restore","all your leaders' energy."],
    quote:"Once filled in for George Beverly Shea and sang \"How Great Thou Art\" at a Billy Graham crusade. (p.132)", initials:"JEF",
    party:[["A. Clarke Dean","Assoc. Pastor"],["Eugene Daniel Jr.","Assoc. Pastor"],["Robert Stigall","Organist"],["Tom Belk","Elder"]] },
  { id:"taylor", name:"J. Randolph Taylor", short:"Taylor", years:"1976-85", p:8,g:10,c:5,v:9,s:3, mult:2,
    trait:"Moderator", traitText:["In 1983 you are elected and leave","for a year. A committee fills in."],
    quote:"He turned the church down three times before finally saying yes. (p.192)", initials:"JRT",
    party:[["Pete Peery","Assoc. Pastor"],["Margaret Peery","Assoc. Pastor"],["Bill McLean","Assoc. Pastor"],["Bill White Jr.","Elder"]] },
  { id:"croft", name:"Tim Croft", short:"Croft", years:"1987-95", p:6,g:6,c:8,v:8,s:4, mult:2,
    trait:"Knows Every Name", traitText:["Members never drop when your","leaders leave. Watch your Stamina."],
    quote:"A NASCAR devotee, he once told the Session that on the seventh day God created \"the Winston Cup.\" (p.279)", initials:"TLC",
    party:[["Jane Summey","Assoc. Pastor"],["Ray Scott","Assoc. Pastor"],["Tyler Downing","Assoc. Pastor"],["Lib Harkey","Elder"]] },
  { id:"swicegood", name:"Terry Swicegood", short:"Swicegood", years:"1996-99", p:7,g:6,c:5,v:6,s:2, mult:3,
    trait:"Preaches from the Floor", traitText:["Sermon events swing big either way.","Hard mode."],
    quote:"He was hired above all for his preaching, which the search team called \"his greatest gift.\" (p.286)", initials:"TVS",
    party:[["Peter Henry","Assoc. Pastor"],["Von Clemans","Assoc. Pastor"],["Charles MacDonald","Assoc. Pastor"],["Julius Melton","Staff"]] },
  { id:"eason", name:"Steve Eason", short:"Eason", years:"2002-15", p:8,g:5,c:9,v:6,s:7, mult:1,
    trait:"We Need a Therapist", traitText:["Morale crises hit at half strength."],
    quote:"He accepted after a golf-course conversation with an attorney on the search team, deciding that maybe \"Just once\" God might be speaking to him through a lawyer. (p.315)", initials:"SPE",
    party:[["Millie Snyder","Exec. Pastor"],["Deborah Conner","Assoc. Pastor"],["Rebecca Davis","Assoc. Pastor"],["Dale Allison","Administrator"]] },
  { id:"clifford", name:"Joe Clifford", short:"Clifford", years:"2016-", p:8,g:7,c:7,v:7,s:7, mult:1,
    trait:"Flagship", traitText:["Campaign goals are larger, outreach","pays more. Jennifer Childers rides along."],
    quote:"For a sabbatical he hiked 100 miles across Ireland, including a stop at the parish where his great-great-grandfather was baptized in 1826. (p.413)", initials:"JJC",
    party:[["Millie Snyder","Exec. Pastor"],["Michelle Thomas-Bush","Assoc. Pastor"],["John Magnuson","Assoc. Pastor"],["Lisa Hickman","Assoc. Pastor"]],
    rider:"Jennifer Childers" },
  { id:"calvin", name:"John Calvin", short:"Calvin", years:"1509-64", p:10,g:10,c:3,v:10,s:10, mult:0.5, secret:true,
    trait:"Predestined", traitText:["The dice are rigged in your favor,","and you know it."],
    quote:"Wrote the 1,500-page Institutes of the Christian Religion. It is not on the stewardship-drive reading list.", initials:"JC",
    party:[["John Knox","Reformer"],["Francis Makemie","Presbyterian"],["Andrew Carnegie","Donor"],["Fred Rogers","Neighbor"]] }
];

// ---------- PASTOR BIOS (shown on the pastor card) ----------
DATA.bios = {
  gammon:"Myers Park's founding pastor, called in 1927 to a flock of 256 with no building, no lot, and no funds. Gammon led with such force that a newspaper called him \"as vibrant with energy as a Leyden jar,\" insisting on raising a true church home first and carrying the young congregation through the Depression.",
  jones:"A spellbinding preacher, \"the ultimate master of the English language,\" Jones arrived at age 28 and became nationally known, even preaching to President Eisenhower. He led the church as they planted daughter churches and championed denominational reunion decades before his peers.",
  fogartie:"Warm and beloved, Fogartie served nineteen years, the longest tenure in the church's history, growing it from 2,138 to 3,000 members. A gifted baritone, he once sang \"How Great Thou Art\" to a packed Coliseum at Billy Graham's 1958 Crusade.",
  taylor:"Dignified and profound, Taylor brought extraordinary gravitas to the pulpit and was elected Moderator of the reunited PC(USA) in 1983, helping heal a rift that dated to 1861. A civil-rights veteran, he helped found Habitat for Humanity of Charlotte.",
  croft:"The personable Croft knew every officer by name and cared about the smallest details, even carpeting the hymnal racks so the books wouldn't thump. He led the church to form an AIDS task force when few large churches would.",
  swicegood:"Called chiefly for his preaching, described as \"his greatest gift,\" Swicegood brought a scholar's depth and a memorable voice to the pulpit. During his tenure the church opened its doors to Room in the Inn, sheltering Charlotte's neighbors on cold nights.",
  eason:"A former therapist with a gift for humor, Eason paired warmth with calm steadiness across thirteen years. He guided the church through the Great Recession, leading a $27 million campaign and holding the line to protect missions when budgets tightened.",
  clifford:"Known for his warmth and affability, Clifford came from urban ministry in Dallas and holds a Doctor of Ministry in preaching. He has steered the church through the COVID-19 pandemic and the $22 million Cultivate campaign toward its 2026 centennial.",
  calvin:"The Geneva reformer whose teaching gave Presbyterians both their name and their theology. Author of the monumental Institutes of the Christian Religion, Calvin preached and wrote with such rigor that five centuries on, \"Reformed\" still means his vision of God's sovereignty and grace."
};

DATA.statNames = { p:"Preaching", g:"Gravitas", c:"Charisma", v:"Vision", s:"Stamina" };
DATA.statBase = 10;  // the on-screen bar reads stat + this base, out of 20

// ---------- TRAIL ----------
// type: start | land | cross | end.  short:true = also on the Short Trail.
DATA.trail = [
  { year:1926, type:"start", short:true, name:"Queens College Chapel",
    scene:["Eighty-two people sign a petition","for a new church in Myers Park.","It's really happening!"],
    fact:["On October 10, 1926, one hundred eighteen people met in the Queens College chapel and eighty-two of them signed a petition to organize a new Presbyterian church in Myers Park. By the time it was formally organized that November it already had two hundred forty-five members.","Myers Park was then a brand-new streetcar suburb of tree-lined curving streets. The founders had no building, no lot, and, as one of them put it, no funds for either. They were excited to get going anyway."], page:"p.6-8" },
  { year:1927, type:"cross", short:true, name:"Building the First Church", campaign:"Founders Campaign", goal:275000,
    scene:["The first pastor sees the new lot \"fit only for broom-straw,\"","sinks into a chair, and asks: \"What in the world?\""],
    fact:["The Founders Campaign raised about two hundred seventy-five thousand dollars for the stone Sanctuary and the Sunday School classrooms behind it. The architects gave it an English Gothic look, and the stone was hauled from a quarry at the edge of the Myers Park Country Club by mule.","Stone kept disappearing from the construction site overnight, so the church hired a night watchman."], page:"p.19-34, 433" },
  { year:1929, type:"land", short:true, name:"First Service in the Sanctuary",
    scene:["The first worship service held on","the church's own property."],
    fact:["The first service in the stone Sanctuary was held in April 1929 on a very warm Sunday. There was no air conditioning, and the temperature was in the eighties. One founding member still pronounced it very, very comfortable.","Air conditioning did not arrive until 1952."], page:"p.38" },
  { year:1931, type:"land", short:false, name:"The Depression Reaches the Pews",
    scene:["The stock market has crashed. The","church has a loan out on the Sanctuary,","and many of its members are hit hard."],
    fact:["Four of Charlotte's seven banks failed during the Depression, and contributions to the church fell with them. In 1932 the Session cut the pay of the paid choir members by a quarter.","None of the singers quit, and benevolences were not reduced. They also proceeded with construction of the manse the church had promised its first pastor, albeit four years behind schedule."], page:"p.52-55" },
  { year:1941, type:"land", short:true, name:"A Church on the Home Front",
    scene:["The new Educational Building opens.","The Second World War begins soon after.","Many members go off to serve."],
    fact:["A 1940 campaign raised a hundred and fifty thousand dollars for a three-story Educational Building (the B Building today) — Sunday-School classes had been crowded and they needed more space. It opened in late 1941, just as the United States entered the Second World War.","The church was named a civil-defense welfare station. In 1944, German prisoners of war were brought to Myers Park to clear the pine trees along what is now Hampton Avenue."], page:"p.68, 73, 86-89" },
  { year:1944, type:"land", short:false, name:"The Noon Prayer Bell",
    scene:["The bell rings at noon for the troops.","German prisoners of war clear the","pines out front."],
    fact:["Beginning in May 1944 the church rang its bell every day at noon and asked the congregation, wherever they were, to stop and pray for the men and women overseas. The church kept a Servicemen's Bulletin to stay in touch with those who had shipped out.","On D-Day, the building was left open all day so people could come in and pray."], page:"p.86-90" },
  { year:1952, type:"land", short:true, name:"The Children's Building",
    scene:["The new Children's Building opens!","Session air-conditions the Sanctuary in","your absence. Congratulations."],
    fact:["A year earlier, the church's twenty-fifth-anniversary campaign had raised three hundred thousand dollars — a hundred and eighty thousand to build a new Children's Building (the C Building today), and the rest to help start churches across Charlotte. The building opened around 1952.","That same year, while pastor James A. Jones was away touring global mission sites including Congo, the officers voted to air-condition the Sanctuary — reasoning it would boost summer attendance. Jones found out when he got home."], page:"p.114, 119, 122-123" },
  { year:1959, type:"cross", short:true, name:"Expanding the Sanctuary", campaign:"Sanctuary Expansion", goal:1113000,
    scene:["Space in the original Sanctuary is getting tight! Time to expand."],
    fact:["The 1959 campaign raised over a million dollars. It lengthened the Sanctuary by two windows' worth of pews and added an Education and Fellowship Building (the D Building today). The front wall of the Sanctuary was supposed to come down with a wrecking ball — but the ball bounced off the granite, and the crew finished the job with hammers and chisels."], page:"p.138-144, 433" },
  { year:1962, type:"land", short:false, name:"Rededication",
    scene:["The Sanctuary reopens with a new Casavant","organ and Willet stained glass reredos."],
    fact:["The expanded Sanctuary was rededicated in March 1962. It had a new thirty-six-hundred-pipe organ and, behind the communion table, a fancy new reredos. It was also reconfigured from a two-aisle layout to a single center aisle.","The stained-glass windows replaced the old clear glass over the course of the 1960s."], page:"p.142-144" },
  { year:1971, type:"land", short:true, name:"First Women Elders",
    scene:["The first women are ordained","as church elders."], straight:true,
    fact:["In November 1971 Lib Harkey and Danny Verner were ordained as the church's first women elders, a year after the first women deacons. The denomination had voted to ordain women as elders in 1964.","One member objected, saying that the women's high heels would clatter on the stone floor as they served communion. Lib Harkey made sure she wore her heels."], page:"p.179-180" },
  { year:1976, type:"land", short:false, name:"50th Anniversary",
    scene:["A jubilant celebration, including","a \"Saints and Sinners\" roast."],
    fact:["The fiftieth anniversary in May 1976 included a Saints and Sinners evening where the congregation roasted itself. The new pastor, J. Randolph Taylor, was teased for not preaching enough hellfire.","One member played Lucifer and sang a number that included the line \"Down with virtue, down with goodness, sin is here to stay!\""], page:"p.197-198" },
  { year:1983, type:"land", short:true, name:"Reunion in Atlanta",
    scene:["The Southern and Northern churches","are reunited to become the PC(USA)."], straight:true,
    fact:["In June 1983 the northern and southern Presbyterian churches reunited at the General Assembly in Atlanta after one hundred twenty-two years apart, a split that dated to the Civil War. Eight thousand Presbyterians marched through downtown behind bagpipes.","Myers Park's pastor, J. Randolph Taylor, was elected the first Moderator of the reunited church. His duties as Moderator would mean significant time away from the church."], page:"p.223-225" },
  { year:1989, type:"cross", short:true, name:"Building the Christian Life Center", campaign:"New Horizons", goal:6000000,
    scene:["Building a gym and dedicated office","space for pastors and staff."],
    fact:["The New Horizons campaign raised about six million dollars for the Christian Life Center, a new slate roof, and an elevator that the children promptly tied up riding up and down. The thirty-thousand-square-foot building added a gym and meeting space the church had wanted for years.","Hurricane Hugo tore through Charlotte in September 1989, downing eighty thousand trees and leaving most of the city without power. The church held a relief breakfast and broke ground on the new building about a week later."], page:"p.256-263, 434" },
  { year:1996, type:"land", short:false, name:"Room in the Inn",
    scene:["Neighbors without homes sleep in the","church. A house rolls down Providence","Road at midnight."],
    fact:["Room in the Inn began at the church in December 1996, offering people without a home a warm place to sleep through the winter. It continues today.","In 1997, the lot across Providence Road was purchased by the church. The house that stood on it was picked up and moved down Providence Road at midnight to a new location."], page:"p.287-289, 342" },
  { year:2002, type:"land", short:false, name:"Celebrate Launches",
    scene:["A new worship service begins in the gym","during an interim time between head of","staff pastors."],
    fact:["The Celebrate service began in February 2002 in the Christian Life Center gym. It was a more casual, contemporary service than the one in the Sanctuary. Tarps were spread on the gym floor and a video feed carried the sermon.","About three hundred people came to the first one. The organizers had hoped it would bring in people the traditional service was not reaching."], page:"p.312-314" },
  { year:2008, type:"cross", short:true, name:"Building the Outreach Center", campaign:"Deeper Discipleship", goal:27220300,
    scene:["The Great Recession hits as the church","sets out to raise millions of dollars."],
    fact:["The Deeper Discipleship campaign raised twenty-seven million dollars even as the 2008 financial crisis unfolded around it. It built the Outreach Center, turned the Christian Life Center into classrooms, Oxford Hall, and the Welcome Center, paid off three million dollars of debt, and invested significantly in our Outreach partnerships.","That December, the church still needed one point six million dollars for the annual budget. One cost-cutting idea on the table was to stop giving away coffee, saving about seventeen thousand dollars a year."], page:"p.331-340, 356, 434" },
  { year:2011, type:"land", short:false, name:"The Outreach Center Opens",
    scene:["A new building across the road."],
    fact:["The Outreach Center was dedicated in June 2011. It added a wellness center, meeting rooms, and space for the church's growing outreach ministries.","The church had planned for about one hundred fifty Wellness Ministry memberships. Five hundred seventy-six people signed up."], page:"p.353, 356" },
  { year:2015, type:"land", short:true, name:"The Wedding Policy",
    scene:["The denomination has changed its","definition of marriage to include","people of the same gender. Session","holds a town hall."], straight:true,
    fact:["In 2015, after the denomination changed its definition of marriage, the Session held a town hall, several listening sessions, and plenty of meetings to determine a path forward. They ultimately amended the church's wedding policy to include people of all genders. Some families left and annual giving declined."], page:"p.367-368" },
  { year:2020, type:"cross", short:true, name:"Renovating the Children's Buildings", campaign:"Cultivate", goal:22025700,
    scene:["A new campaign launched in the","middle of a pandemic."],
    fact:["The Cultivate campaign was approved in December 2019 and launched in 2021, in the middle of the COVID-19 pandemic. It renovated the Weekday School, children's ministry spaces, Providence Hall, Cornerstone House, and the columbarium. It also funded a connector building between the C and D buildings and invested heavily in affordable housing and housing stability programs.","When worship first moved online due to COVID, a Sunday might have thirty-three people in the building and nine hundred fifty watching from home. A Zoom morning prayer started then and continues today."], page:"p.394-400, 434" },
  { year:2026, type:"end", short:true, name:"Centennial Sunday",
    scene:["One hundred years.","You made it!"],
    fact:["Centennial week: November 1 through 8, 2026. The church that started in 1926 with two hundred forty-five members and no building reported four thousand seven hundred thirty-five members in 2024."], page:"p.419" }
];
DATA.presbyteryYears = [1935,1955,1975,1995,2015];

// ---------- ERA NUMBERS ----------
DATA.budgetAnchors = [[1926,27550],[1942,60000],[1955,250000],[1975,900000],[1989,2600000],[1999,4200000],[2008,6200000],[2020,8500000],[2026,9500000]];
DATA.memberAnchors = [[1926,245],[1934,600],[1939,1000],[1955,2138],[1974,3000],[1985,2800],[1995,3500],[2014,4000],[2024,4735],[2026,4800]];

// ---------- EVENTS ----------
// fields: y (year or [from,to]), t (title lines), fx (effects), page, straight (no jokes), invented, check:{stat,pass,fail}, choice:[{label,fx}]
// key:true = must-see history: when the trail is too busy to show every dated event, key events win the slot (and may run up to 12 years late)
// fx keys: budget (fraction), members (fraction or {n:absolute}), morale, part, stam, energy, year (travel years), msg
DATA.events = [
  // Founding and Depression
  { y:1927, t:["Your call committee sits scattered","in your Selma church to blend in.","You spot them right away."], fx:{morale:5}, page:"p.11", fact:["The committee seeking to call MPPC's first pastor visited their pick at his church in Selma, Alabama. Apparently, Edgar Gammon spotted them right away, confronting them after the service."] },
  { y:1927, t:["Your first budget forgot to include","fire insurance, calendars and","music. Whoops."], fx:{budget:-0.03}, page:"p.30", fact:["The founders of our church didn't have the benefit of a \"parent church\" in the typical sense, and in some ways were learning on the job."] },
  { y:1928, t:["Stone keeps walking off the","building site at night. You hire","a night watchman."], fx:{budget:-0.01}, page:"p.34", fact:["It took a lot of stone, and a lot of mule cart trips hauling it down from a quarry near the country club, to build the church. We presume some folks found our stone as beautiful as we did and decided to abscond with it."] },
  { key:true, y:1929, t:["Session signs a $125,000 mortgage","in June. The stock market crashes","in October."], fx:{budget:-0.15}, page:"p.43-45", fact:["The Wall Street crash of October 1929 wiped out fortunes and tipped the United States into the Great Depression. The church had just signed a mortgage on its new Sanctuary, and Charlotte's banks and givers were badly hurt in the years that followed."] },
  { y:1931, t:["Contributions are down. Cut the","paid choir members' pay by a quarter?"], page:"p.54-55",
    fact:["Contributions fell hard during the Depression — four of Charlotte's seven banks failed. In 1932 the Session cut the paid choir members' pay by a quarter.","Not one singer quit, and the church's benevolences were not reduced."],
    choice:[{label:"Cut the pay",fx:{budget:0.03,morale:-4,msg:"Not one singer quits."}},{label:"Keep paying them in full",fx:{budget:-0.03,morale:2}}] },
  { y:1932, t:["A church in Richmond tries to","call you away."], page:"p.54", check:{stat:"g", pass:{morale:3,msg:"You stay. The Session exhales."}, fail:{morale:-4,msg:"You stay, but they got nervous."}} },
  { y:1937, t:["Session rules that men may remove","their suit coats in summer worship."], fx:{morale:3}, page:"p.123", fact:["Church was a very formal affair in the early days of the church. While we were unable to find any written dress code, we do find it interesting that the question of men's suit coats came before the Session of the church at all."] },
  { key:true, y:1927, t:["The deed to the lot carries a racial","covenant restricting the land to","white owners. It was common in","Myers Park, and it was wrong."], fx:{}, page:"p.19", fact:["Racially restrictive covenants -- deed clauses barring the sale of a lot to non-white owners -- were common across American suburbs in the early twentieth century, and Myers Park was planned with them. The U.S. Supreme Court ruled such covenants legally unenforceable in 1948, and the Fair Housing Act outlawed them in 1968."], straight:true },
  // War and growth
  { y:1942, t:["The church is named a civil-","defense welfare station."], fx:{part:6}, page:"p.81", fact:["After the United States entered the Second World War in December 1941, cities built civil-defense networks and named buildings as welfare and shelter stations in case of attack. Churches across the country took on home-front and relief roles while many of their members served overseas."] },
  { y:1945, t:["A Methodist neighbor fires a","homemade mortar at the church","and misses."], fx:{morale:2}, page:"p.99-101", fact:["Our neighbor at 1543 Queens Road had just returned from WWII with specific skills it seems he needed to continue to hone. His homemade mortar round remains the only known Methodist attack on the Presbyterians."] },
  { y:1948, t:["Polio summer. Parents keep children","home and attendance hits the lowest","ebb in church history."], fx:{part:-8}, page:"p.97", fact:["Polio epidemics swept the United States nearly every summer in the 1940s and 1950s, striking children hardest and leaving some paralyzed. Frightened parents kept children away from crowds -- pools, theaters, and churches -- until a vaccine finally arrived in the mid-1950s."] },
  { y:1948, t:["You are invited on a four-month","goodwill tour of mission sites."], page:"p.110-111",
    choice:[{label:"Go",fx:{part:4,morale:-4,msg:"Session is \"less enthusiastic.\""}},{label:"Stay home",fx:{morale:2}}] },
  { y:1951, t:["Send three hundred members off","to found Trinity Presbyterian?"], page:"p.114",
    fact:["In 1951 Myers Park sent roughly three hundred of its own members off to help organize Trinity Presbyterian Church. The congregation's twenty-fifth-anniversary campaign had deliberately set money aside to help start new churches across Charlotte.","Trinity was one of several daughter churches Myers Park helped begin."],
    choice:[{label:"Send them",fx:{members:{n:-300},morale:10,msg:"A daughter church is born."}},{label:"Keep them",fx:{morale:-3}}] },
  { y:1952, t:["A million-dollar bequest is split","among five charities, the church","included. Session sends half to","benevolences."], fx:{budget:0.12}, page:"p.123", fact:["From the earliest days of the church, the leaders were keen to support and invest in the growing city of Charlotte."] },
  { y:1955, t:["Presbytery meets at MPPC and votes","against reunion. Your own elders","speak on both sides."], page:"p.128", fact:["American Presbyterians split into northern and southern churches in 1861, during the Civil War. Reunion was debated for decades and voted down more than once before the two bodies finally rejoined as the PC(USA) in 1983."], straight:true, check:{stat:"g", pass:{msg:"You keep the peace."}, fail:{members:-0.02}} },
  { y:1955, t:["Parking has reached the manse lawn.","Buy the house next door to put up","a bigger parking lot?"], page:"p.128",
    choice:[{label:"Buy it",fx:{budget:-0.06,morale:4}},{label:"Park on the lawn",fx:{morale:-2}}] },
  // Change
  { key:true, y:1960, t:["The city votes to clear Brooklyn,","a Black neighborhood downtown.","Your members sit on both sides","of the question."], page:"p.149-152", fact:["Brooklyn, in Charlotte's Second Ward, was the city's largest Black neighborhood -- home to churches, businesses, and hundreds of families. Under 'urban renewal' in the 1960s and 1970s the city cleared well over a thousand structures and displaced its residents, and no homes were ever rebuilt there."], straight:true,
    choice:[{label:"Speak from the pulpit",check:{stat:"g",pass:{morale:5},fail:{members:-0.02}}},{label:"Stay quiet",fx:{morale:-5}}] },
  { key:true, y:1963, t:["President Kennedy is shot.","More than a thousand people fill","the Sanctuary that day."], fx:{part:8,morale:-4}, page:"p.155", fact:["President John F. Kennedy was assassinated in Dallas on November 22, 1963. The nation came to a halt, and across the country churches opened their doors so people could gather to pray and grieve."], straight:true },
  { y:1966, t:["The Duke Mansion is left to the","church. It sells for $85,000."], fx:{budget:0.08}, page:"p.170", fact:["The mansion in Myers Park was the Charlotte home of tobacco and electric-power magnate James Buchanan Duke, who enlarged it to some forty-five rooms and signed the papers creating The Duke Endowment there in 1924. After passing through several owners it was restored in the 1990s and today operates as a historic inn."] },
  { y:1970, t:["The youth \"preachernap\" the associate","pastor from the Putt-Putt course."], fx:{morale:3,stam:-1}, page:"p.160", fact:["It's a true story: A group of MPPC Youth abducted their youth pastor and stuffed him in a car, presumably driven by a parent accomplice, driving around town before getting him out to see a big sign reading: \"We love you, Chuckie.\""] },
  { y:1975, t:["A purse thief keeps making off with","money from the choir room. Eventually","the locks are changed."], fx:{budget:-0.01,morale:-1}, page:"p.183", fact:["Thou shalt not steal."] },
  { y:1977, t:["You speak up for clemency for the","Wilmington Ten. Session holds a heated","meeting, and a few members withhold","their pledges in protest."], page:"p.204", fact:["The Wilmington Ten -- nine young Black men and one white woman, led by civil-rights organizer Ben Chavis -- were wrongfully convicted on arson and conspiracy charges after 1971 racial unrest in Wilmington, North Carolina. A federal court overturned the convictions in 1980, and the state formally pardoned the group in 2012."], straight:true, check:{stat:"g", pass:{msg:"You hear everyone out. They stay."}, fail:{budget:-0.05}} },
  { y:1982, t:["So many cars park on the neighbors' streets","that the police chief writes to the Session:","\"The tow-away signs mean what they say.\"","Parking continues to be challenging."], fx:{morale:-3}, page:"p.232", fact:["Many solutions have been proposed to alleviate the parking situation over the years. The most serious and best attempt, providing hundreds of spots at the Outreach Center, has been said to be \"not close enough.\""] },
  { y:1985, t:["A nine-year-old writes Session asking","for a gym. Session prices it out and","defers to the next building campaign."], fx:{morale:1}, page:"p.233-234", fact:["When you write a note to Session, they read it!"] },
  // Big steeple, big weather
  { y:1987, t:["You are called to MPPC by a vote of","619 to 2. You wonder about the two."], fx:{morale:5}, page:"p.239", fact:["Most congregational votes are unanimous, but for reasons lost to time, this one was not."] },
  { key:true, y:1989, t:["Hurricane Hugo. Trees down, power out","for weeks, and the church holds a","relief breakfast in the gym."], fx:{part:-6,budget:-0.04,morale:3,energy:-8}, page:"p.258-260", fact:["Hurricane Hugo struck the Carolina coast as a Category 4 storm in September 1989 and, unusually, stayed powerful far inland. It battered Charlotte through the night, downing tens of thousands of trees and cutting power across the city for weeks."] },
  { y:1991, t:["You form an AIDS Task Force when no","one, \"especially the big steeple","churches,\" would."], page:"p.269-270", fact:["By the early 1990s AIDS had become a leading cause of death for young adults in America, and the epidemic was deepened by fear and stigma. Many large congregations kept their distance, so a church that formed a task force to respond was doing something few 'big steeple' churches would."], check:{stat:"c", pass:{morale:8}, fail:{morale:4,members:-0.01}} },
  { y:1993, t:["Members pledge 125,000 volunteer hours","and millions of dollars in a campaign.","Session lets out un-Presbyterian","whoops of joy."], fx:{part:12,budget:0.05}, page:"p.274" },
  { y:[1988,1995], t:["Session asks what God created on","the seventh day. You answer:","\"The Winston Cup.\""], fx:{morale:3,part:3}, page:"p.277-279", fact:["Tim Croft was a huge NASCAR fan. When a 1971 federal law banned cigarette ads on television, the R.J. Reynolds Tobacco Company shifted its money into motorsports and lent NASCAR's top series the name of its Winston brand. The Winston Cup was stock-car racing's premier championship from 1971 until 2003."] },
  { y:1996, t:["You preach from the floor instead of","the pulpit. The Charlotte Observer","writes about the departure in decorum."], page:"p.286", check:{stat:"p", pass:{morale:6}, fail:{morale:-6}} },
  { y:2002, t:["The Celebrate service launches on","tarps in the gym. Three hundred","people show up."], fx:{members:0.02,part:8}, page:"p.312-314", fact:["The Celebrate service began not at a pastor's direction but during an interim period, when there was no head of staff pastor at all."] },
  { key:true, y:2008, t:["It's the Great Recession :( You need","$1.6M in December. Cut the free","coffee to save $17,000?"], page:"p.339-340",
    fact:["In December 2008, as the financial crisis unfolded, the church still needed one point six million dollars for its annual budget. One cost-cutting idea on the table was to stop giving away coffee, saving about seventeen thousand dollars a year.","Through it all, the church held the line to protect its outreach support."],
    choice:[{label:"Cut the coffee",fx:{budget:0.03,morale:-6,msg:"We're less caffeinated, but outreach funding is not cut."}},{label:"Keep the coffee",fx:{budget:-0.03,morale:1}}] },
  { key:true, y:2011, t:["The denomination ends its ban on","LGBTQIA+ clergy and lay leaders.","Some members leave. Others who","disagreed stay."], fx:{members:-0.01}, page:"p.311-312", fact:["In 2011 the Presbyterian Church (U.S.A.) ratified 'Amendment 10-A,' removing the constitutional barrier to ordaining gay and lesbian clergy and lay leaders. The change let each presbytery and congregation decide for itself, and it took effect that July."], straight:true },
  { key:true, y:2015, t:["The denomination has redefined","marriage. Hold a town hall and","update the wedding policy?"], page:"p.367-368", straight:true,
    fact:["In 2015, after the denomination changed its definition of marriage, the Session held a town hall and several listening sessions before amending the church's wedding policy to include people of all genders.","Some families left and annual giving declined for a time."],
    choice:[{label:"Hold the town hall, update it",fx:{morale:6,members:-0.02,budget:-0.03,msg:"Giving recovers in 18 months."}},{label:"Keep the old policy",fx:{morale:-6,part:-6}},{label:"Delay a year",fx:{morale:-4,msg:"It isn't going away."}}] },
  // Pandemic and centennial
  { y:2016, t:["Your first Sunday in the pulpit at MPPC","is September 11. Nine days later,","unrest downtown. Join the march?"], page:"p.379", fact:["In September 2016 the police shooting of Keith Lamont Scott set off days of protest in Charlotte. The governor declared a state of emergency and the city set a curfew; later marches were largely peaceful as demonstrators called for the release of police video."], straight:true,
    choice:[{label:"Go",check:{stat:"g",pass:{morale:4},fail:{morale:-2}}},{label:"Stay",fx:{morale:-2}}] },
  { y:2023, t:["Tuesdays Together launches for the","over-60 crowd. One hundred come the","first night. The speaker is the one","and only Joe Clifford."], fx:{part:10,morale:3}, page:"p.415" },
  { key:true, y:2020, t:["COVID-19 hits. Worship goes online.","Staff are furloughed. A Zoom morning","prayer begins and continues on","weekday mornings even now."], fx:{part:-25,budget:-0.05}, page:"p.394-400", fact:["The World Health Organization declared COVID-19 a pandemic in March 2020, and gatherings of every kind shut down. Churches moved worship online almost overnight -- a single Sunday might have a few dozen people in the building and hundreds more watching from home."], straight:true },
  { y:2022, t:["The new organist plays so loudly","he knocks pictures off the walls."], fx:{morale:4}, page:"p.411", fact:["Tom Robak began as our organist in 2022, and during a particularly robust practice session, rattled the walls of the chancel so much the photos on the other side slipped off of their nails and crashed to the floor."] },
  { y:2024, t:["Hurricane Helene devastates much of","western North Carolina. The church","houses displaced volunteers and","sends $125,000 in relief."], fx:{part:6,morale:5,budget:-0.02}, page:"p.415-416", fact:["Hurricane Helene came ashore in Florida in late September 2024 and pushed inland, dropping catastrophic rain on the southern Appalachians. Western North Carolina around Asheville was hit especially hard, and churches across the state sent volunteers and relief."] },
  // Any era, real
  { y:"any", t:["Hugh McManaway is directing traffic","at Providence and Queens again."], page:"p.40, 94-96", fact:["Hugh McManaway was a Charlotte eccentric who for years stood at Providence and Queens Roads, near the church, cheerfully 'directing' the traffic with a towel tucked under his arm. A bronze statue of him was placed at the intersection in 2000, and neighbors still dress it up for weddings and graduations."], hugh:true },
  { y:"any", t:["A family arrives for a funeral.","Wrong church. The Baptists are","down the street."], fx:{morale:2}, page:"p.250", fact:["Our church is often confused for other churches in the neighborhood."] },
  { y:"any", t:["Groomsmen arrive for a wedding.","Wrong church. The Methodists are","through the hedge."], fx:{morale:2}, page:"p.250", fact:["Our church is often confused for Myers Park United Methodist. We even have similar stonework!"] },
  { y:[1990,2026], t:["Wednesday supper is chicken","tetrazzini again."], fx:{morale:-1}, page:"p.289", fact:["We don't know what the problem is here, really."] },
  { y:[1950,1965], t:["One of the old huts is towed off","to Freedom Park."], fx:{morale:2}, page:"p.139", fact:["When the church was constructing the education and fellowship buildings (C and D buildings), they had to move the church huts that used to be on that part of the lot. One hut was given to the Junior League, who had it towed over near Freedom Park to serve as their office and gathering space. It's still in use today."] },
  // Invented
  { y:"any", invented:true, t:["A big donor family moves to Florida.","They say they'll still watch online."], fx:{budget:-0.04} },
  { y:"any", invented:true, t:["The boiler needs a complete","overhaul."], fx:{budget:-0.03}, boiler:true },
  { y:"any", invented:true, t:["The bell tower is out of tune."], fx:{morale:-1} },
  { y:"any", invented:true, t:["A bird gets into the Sanctuary","during the anthem. Morale soars."], fx:{morale:3,part:1,energy:5} },
  { y:"any", invented:true, t:["Session meeting runs past ten p.m.","Morale sinks."], fx:{morale:-2,stam:-1,energy:-5} },
  { y:"any", invented:true, t:["You arrive to a full parking lot.","Morale sinks."], fx:{morale:-2,part:2} },
  { y:"any", invented:true, t:["A visiting preacher goes fifteen","minutes long."], fx:{morale:-2,part:-1} },
  { y:"any", invented:true, t:["The bulletin lists the wrong hymn","number. The congregation sings","the right one anyway."], fx:{morale:1} },
  { y:"any", invented:true, t:["A casserole arrives at the office,","unprompted and still warm. Morale soars."], fx:{morale:3,part:1,energy:5} },
  { y:"any", invented:true, t:["The copier jams on the Friday","before Easter. Morale sinks."], fx:{morale:-2,stam:-1,energy:-5}, coffee:true },
  { y:"any", invented:true, t:["A youth fundraiser somehow produces","seven hundred pies. Morale soars."], fx:{morale:3,energy:5} },
  { y:"any", invented:true, t:["The organ needs tuning the week","of the Messiah."], fx:{budget:-0.01} },
  { y:"any", invented:true, t:["A member's dog attends worship","and behaves better than some."], fx:{morale:2} },
  { y:"any", invented:true, t:["Rain on the day of the church picnic.","The gym worked fine."], fx:{part:-2,morale:-1} },
  { y:"any", invented:true, t:["The fellowship coffee runs out","halfway through. Morale sinks."], fx:{morale:-3}, coffee:true },
  { y:"any", invented:true, t:["The nominating committee asks you","to weigh in on a hiring decision.","Tread carefully."], fx:{stam:-1} },
  { y:"any", invented:true, t:["A newcomer asks which Myers Park","church this one is."], check:{stat:"c", pass:{members:0.01,msg:"They join."}, fail:{msg:"They try the Methodists."}} }
];

// ---------- A GENEROUS GIFT ----------
// Fires once a game, the first time Funds drop below `below` (a fraction of a healthy year's reserves) in or after
// `fromYear`. The 2008 and 2020 campaigns came close together, and this keeps a thin budget from ending the run at the finish line.
DATA.windfall = { fromYear:1995, below:0.25, invented:true,
  t:["A generous member is inspired to give","a significant gift to the operating","fund. Thanks be to God!"], fx:{budget:0.20,morale:3} };

// ---------- PRESBYTERY TRADES ----------
DATA.presbytery = [
  { t:["Lend an associate pastor to a","struggling church for a year."], fx:{part:-6,stam:-1,energy:-10,members:0.02,msg:"They come back with friends."}, decline:{morale:-2} },
  { t:["Fund a Presbytery grant."], fx:{budget:-0.06,morale:4,msg:"They ask for it every year."}, decline:{morale:-2} },
  { t:["Host the Presbytery meeting."], fx:{budget:-0.03,morale:6,msg:"Your elders step up to host beautifully."}, decline:{morale:-2} },
  { t:["Send twenty volunteers to a new","church to help them organize their","new ministry."], fx:{part:-6,morale:6,energy:-10,msg:"They come home fired up."}, decline:{morale:-2} },
  { t:["Serve as chair of the Commission","on Ministry, again."], fx:{stam:-3,morale:4,msg:"Session is proud. You are tired."}, decline:{morale:-1} }
];
DATA.presbyteryFact = ["A Presbytery is the regional body of","Presbyterian churches. Its member","churches share pastors, money and","help with one another."];

// ---------- AILMENTS, DEPARTURES ----------
DATA.ailments = ["Committee Fatigue","Laryngitis","Casserole Overload","Golf Elbow","Bulletin Burnout","Too Many Potlucks"];
DATA.departures = ["has accepted a call to Honolulu.","has accepted a call to Richmond.","has started a brewery instead.","has accepted a call to Iowa.","has moved to Florida.","has gone back to seminary."];

// ---------- GAME OVER ----------
DATA.gameOver = {
  budget:["Your church is out of money. The","Presbytery merges you with","Covenant Presbyterian."],
  members:["The congregation has all transferred","to Covenant Presbyterian."],
  morale:["Session has quietly formed a Pastor","Nominating Committee and didn't","tell you."],
  stamina:["You have retired early to Montreat.","Session sends a fruit basket and","a very nice letter."],
  party:["You are alone in the chancel and","cannot figure out how to turn on","the organ."],
  calvin:["You have been banished from","Geneva. Again."]
};

// ---------- SEEDED LEADERBOARD ----------
DATA.seedScores = [["JAJ",9800],["EGG",9100],["JRT",8600],["TLC",8200],["TVS",7400],["JJC",5200],["SPE",4600],["JEF",3900]];

// ---------- HYMNS (public domain). [midiNote, beats]. Melodies transcribed from lead-sheet MIDIs. ----------
// Amazing Grace (one verse) is also used by Fogartie's "sing a hymn".
DATA.hymn = [[67,1],[72,2],[76,0.5],[72,0.5],[76,2],[74,1],[72,2],[69,1],[67,2],[67,1],[72,2],[76,0.5],[72,0.5],[76,2],[74,1],[79,2],[76,1],[79,1.5],[76,0.5],[79,0.5],[76,0.5],[72,2],[67,1],[69,1.5],[72,0.5],[72,0.5],[69,0.5],[72,3]];
// Hymns the background music cycles through during play.
DATA.hymns = [
  [[67,1],[72,2],[76,0.5],[72,0.5],[76,2],[74,1],[72,2],[69,1],[67,2],[67,1],[72,2],[76,0.5],[72,0.5],[76,2],[74,1],[79,2],[76,1],[79,1.5],[76,0.5],[79,0.5],[76,0.5],[72,2],[67,1],[69,1.5],[72,0.5],[72,0.5],[69,0.5],[72,3]],
  [[67,0.5],[65,0.5],[63,1],[63,1],[67,0.5],[70,0.5],[65,1],[65,1],[67,0.5],[70,0.5],[72,1],[70,1],[67,0.5],[65,0.5],[63,2],[67,0.5],[65,0.5],[63,1],[63,1],[67,0.5],[70,0.5],[65,1],[65,1],[67,0.5],[70,0.5],[72,1],[70,1],[67,0.5],[65,0.5],[63,2],[70,0.5],[72,0.25],[74,0.25],[75,1],[74,1],[72,0.5],[70,0.5],[72,0.5],[70,0.5],[67,1],[70,0.5],[72,0.25],[74,0.25],[75,1],[74,1],[72,0.5],[70,0.5],[75,2],[67,0.5],[65,0.5],[63,1],[63,1],[67,0.5],[70,0.5],[65,1],[65,1],[67,0.5],[70,0.5],[72,1],[70,1],[67,0.5],[65,0.5],[63,2]]
];
