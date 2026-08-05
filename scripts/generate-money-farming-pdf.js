const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateMoneyFarmingPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontIt = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Emerald Green & Gold Theme for Money Farming
  const emeraldGreen = rgb(0.11, 0.72, 0.33); // #1db954
  const darkCharcoal = rgb(0.12, 0.14, 0.16);
  const textDark = rgb(0.18, 0.2, 0.22);
  const mutedText = rgb(0.45, 0.5, 0.55);
  const lightBg = rgb(0.96, 0.97, 0.96);
  const borderLine = rgb(0.85, 0.85, 0.85);

  const cleanText = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/₦/g, 'NGN ')
      .replace(/→/g, '->')
      .replace(/•/g, '-')
      .replace(/●/g, '-')
      .replace(/·/g, '-')
      .replace(/—/g, '--')
      .replace(/–/g, '-')
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/‘/g, "'")
      .replace(/’/g, "'");
  };

  const addHeaderFooter = (page, title, pageNum) => {
    const { width, height } = page.getSize();
    page.drawLine({
      start: { x: 50, y: height - 45 },
      end: { x: width - 50, y: height - 45 },
      thickness: 0.8,
      color: borderLine,
    });
    page.drawText(cleanText(`MONEY FARMING -- ${title.toUpperCase()}`), {
      x: 50,
      y: height - 38,
      size: 8,
      font: fontB,
      color: mutedText,
    });

    page.drawLine({
      start: { x: 50, y: 45 },
      end: { x: width - 50, y: 45 },
      thickness: 0.8,
      color: borderLine,
    });
    page.drawText("© 2025 Zeki Ubor • The Becoming Institute", {
      x: 50,
      y: 30,
      size: 8,
      font: fontR,
      color: mutedText,
    });
    page.drawText(`Page ${pageNum} of 100`, {
      x: width - 110,
      y: 30,
      size: 8,
      font: fontR,
      color: mutedText,
    });
  };

  // EXACT 100 PAGES MATCHING THE UPLOADED PDF MANUSCRIPT
  const rawPages = [
    // Page 1
    `MONEY FARMING\nThe 7 Principles for Planting, Growing, and Harvesting Wealth\n\nZeki Ubor`,
    // Page 2
    `DEDICATION\n\nTo every dreamer who has worked hard yet wondered why financial abundance seemed far away.\n\nMay this book help you discover that wealth is not a mystery--it is a harvest.`,
    // Page 3
    `TABLE OF CONTENTS\n\nIntroduction\nThe Farmer's Secret\n\nChapter 1\nUnderstanding Money Farming\n\nChapter 2\nPreparing Your Financial Soil\n\nChapter 3\nPlanting Wealth Seeds\n\nChapter 4\nNurturing Growth\n\nChapter 5\nRemoving Financial Weeds\n\nChapter 6\nHarvesting Wealth\n\nChapter 7\nReplanting for Generational Wealth\n\nConclusion\nThe Next Planting Season\n\nAbout the Author`,
    // Page 4
    `INTRODUCTION\n\nThe Farmer's Secret\n\nOne morning, a young man stood beside an elderly farmer and asked a question that many people ask about money:\n\n"How do I become wealthy?"\n\nThe farmer smiled but said nothing.\n\nInstead, he handed the young man a handful of seeds.\n\nConfused, the young man looked at the seeds and said, "I asked about wealth, not farming."\n\nThe farmer replied:\n\n"That is the problem. Most people think wealth and farming are different."\n\nThe young man listened carefully.\n\nThe farmer continued:\n\n"You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."\n\nThe young man suddenly understood.\n\nMoney follows the same laws.\n\nThe wealthiest people in the world are not merely earners; they are farmers. They plant ideas, skills, businesses, relationships, and investments. They nurture these seeds over time until they produce harvests far greater than the original seed.\n\nMany people spend their lives chasing money.\n\nFew learn how to grow it.`,
    // Page 5
    `This book introduces a simple but powerful concept called Money Farming.\n\nMoney Farming is the intentional process of planting value-producing seeds, cultivating opportunities, protecting resources, and harvesting sustainable wealth.\n\nThroughout this book, you will discover seven principles that can transform your relationship with money forever.\n\nBy the end, you will understand that wealth is not something you chase.\n\nWealth is something you cultivate.\n\nWelcome to Money Farming.\n\nProposed Book Structure\n\nIntroduction - 4 pages\n\nChapter 1: Understanding Money Farming - 8 pages\n- Why people chase money\n- Why money is a harvest\n- The farming mindset\n\nChapter 2: Preparing Your Financial Soil - 8 pages\n- Mindset\n- Vision\n- Financial awareness\n- Personal responsibility\n\nChapter 3: Planting Wealth Seeds - 10 pages\n- Skills\n- Knowledge\n- Relationships\n- Opportunities\n- Service`,
    // Page 6
    `Chapter 4: Nurturing Growth - 8 pages\n- Consistency\n- Discipline\n- Learning\n- Patience\n\nChapter 5: Removing Financial Weeds - 8 pages\n- Debt\n- Poor habits\n- Fear\n- Distractions\n- Excuses\n\nChapter 6: Harvesting Wealth - 10 pages\n- Income\n- Business growth\n- Investments\n- Wealth multiplication\n\nChapter 7: Replanting for Generational Wealth - 8 pages\n- Legacy\n- Mentorship\n- Systems\n- Long-term impact\n\nConclusion - 3 pages\n\nAbout the Author - 1 page\n\nFor the cover, I would use the tagline:\n\nMONEY FARMING\nThe 7 Principles for Planting, Growing, and Harvesting Wealth`,
    // Page 7
    `CHAPTER 1: UNDERSTANDING MONEY FARMING\n\nThe Man Who Sold His Harvest\n\nIn 2013, Chinedu worked as a sales representative in Enugu.\nEvery month, his salary arrived.\nEvery month, it disappeared.\nHis routine never changed.\nPayday came.\nBills came.\nFriends called.\nWeekends happened.\nBy the middle of the month, the account balance was almost empty.\nThen he would wait anxiously for the next salary.\nFor seven years, Chinedu repeated the same cycle.\nOne evening, while visiting his village, he sat under a mango tree with his grandfather.\nHis grandfather had been a farmer for over fifty years.\nAs they talked, Chinedu complained about money.\n"Papa, I work hard, but nothing stays with me."\nThe old man listened quietly.`,
    // Page 8
    `Then he asked a strange question.\n"Do you know why farmers keep seeds after harvest?"\nChinedu laughed.\n"So they can plant next season."\nHis grandfather nodded.\nThen he looked directly into his eyes.\n"That is your problem."\nChinedu frowned.\n"What do you mean?"\nThe old man continued.\n"Every month you harvest money. Then you eat all your seeds."\nThe statement landed heavily.\nFor the first time, Chinedu saw his finances differently.\nHe was not poor because he earned little.\nHe was poor because he consumed everything.\nThe farmer never eats all his harvest.\nHe preserves some for planting.\nThat conversation changed his life.\nWithin five years, Chinedu had built a small distribution business that eventually earned more than his salary.\nThe difference was not more money.\nThe difference was understanding the principle of Money Farming.`,
    // Page 9
    `Wealth Is Not Found. It Is Grown.\n\nMany people treat money like treasure.\nThey spend their lives searching for it.\nLooking for shortcuts.\nLooking for lucky breaks.\nLooking for miracles.\nFarmers understand a different reality.\nA harvest is not found.\nIt is grown.\nThe mangoes on a tree were once invisible.\nThe harvest in a field was once hidden beneath the soil.\nThe wealth you admire today in successful people often began as something small and unnoticed.\nA skill.\nAn idea.\nA relationship.\nA business.\nA book.\nA service.\nA seed.`,
    // Page 10
    `The Dangerous Lie We Were Taught\n\nMost people were taught:\nGo to school.\nGet a good job.\nWork hard.\nRetire.\nUnfortunately, nobody explained how wealth is actually created.\nA job pays you for your labor.\nA farm pays you for what you have cultivated.\nThe wealthy focus on building farms.\nThe average person focuses on collecting harvests.\nOne creates assets.\nThe other consumes income.\nThis difference changes everything.\n\nThe Case of Dangote\n\nWhen people see wealth, they usually see the harvest.\nThey rarely see the planting season.`,
    // Page 11
    `Many years before becoming Africa's richest businessman, Aliko Dangote started with small trading opportunities.\nWhat eventually became a business empire began as seeds.\nRelationships.\nKnowledge.\nDistribution systems.\nMarket understanding.\nOver time, those seeds multiplied.\nToday people see the harvest.\nFew study the planting.\nThat is the mistake many people make.\nThey admire results while ignoring processes.\n\nThe First Principle of Money Farming\n\nMoney follows value.\nFarmers produce crops.\nBusinesses produce solutions.\nProfessionals produce expertise.\nAuthors produce knowledge.\nTeachers produce transformation.\nThe greater the value produced, the greater the harvest received.`,
    // Page 12
    `This means your focus should not be money.\nYour focus should be the seed that produces money.\n\nReflection Questions\n1. What financial seeds am I currently planting?\n2. Am I consuming all my harvest?\n3. What skill, knowledge, or opportunity could become my next financial crop?\n4. Am I focused on money or on creating value?\n\nMoney Farming Action Step\n\nFor the next seven days, track every naira that enters and leaves your hands.\nAt the end of the week, identify:\n- Harvest consumed.\n- Harvest invested.\n- Seeds planted.\n\nMost people will discover they are eating tomorrow's harvest today.\nMoney farmers do something different.\nThey save seeds.\nThey plant seeds.\nAnd eventually, they enjoy harvests others only dream about.`,
    // Page 13
    `CHAPTER 2: PREPARING YOUR FINANCIAL SOIL\n\nThe Harvest That Never Came\n\nIn 2015, Emeka got the biggest breakthrough of his life.\nAfter years of searching, he finally secured a job with a multinational company in Lagos.\nHis salary was more than three times what he had earned previously.\nThe celebration lasted for weeks.\nFamily members congratulated him.\nFriends admired him.\nEveryone believed his financial struggles were over.\nIncluding Emeka.\nFor the first few months, everything felt different.\nHe moved into a better apartment.\nBought a newer phone.\nChanged his wardrobe.\nStarted eating at places he once considered expensive.\nLife seemed to be moving forward.\nBut something strange happened.\nAt the end of every month, there was almost nothing left.`,
    // Page 14
    `The bigger salary had disappeared.\nOne year later, Emeka was earning more than ever before but was still financially anxious.\nThree years later, he had no investments.\nNo emergency savings.\nNo assets.\nNo plan.\nOnly a bigger lifestyle.\nOne evening, while reviewing his finances, he asked himself a difficult question:\n"Where did all the money go?"\nThe answer shocked him.\nThe problem was never his income.\nThe problem was his soil.\nMore money had entered his life.\nBut it entered the same financial habits.\nThe same mindset.\nThe same lack of direction.\nThe same poor decisions.\nThe soil had not changed.\nOnly the seed had become bigger.\nAnd poor soil destroys even the best seeds.`,
    // Page 15
    `Why Some People Never Prosper\n\nMany people believe money alone changes lives.\nIt doesn't.\n\n"Money is an amplifier, not a transformer. Higher income cannot compensate for poor financial habits."\n\nIf discipline exists, money expands discipline.\nIf wisdom exists, money expands wisdom.\nIf confusion exists, money expands confusion.\nMoney is an amplifier.\nNot a transformer.\nA farmer understands this principle.\nNo matter how expensive the seeds are, bad soil produces disappointing harvests.\nBefore planting wealth, you must prepare your financial soil.\n\nThe First Layer of Soil: Responsibility\n\nMany people unknowingly hand over responsibility for their finances.\nThey blame:\nThe government.\nThe economy.`,
    // Page 16
    `Their employer.\nTheir family background.\nTheir circumstances.\nWhile these factors may influence financial outcomes, they cannot completely determine them.\nThe day a farmer blames the weather for every poor harvest is the day he stops improving his farming methods.\nResponsibility is the moment you say:\n"My future may have been influenced by others, but it will not be determined by others."\nResponsibility is where wealth begins.\n\nThe Second Layer of Soil: Awareness\n\nImagine driving from Enugu to Abuja.\nYou enter the vehicle.\nStart the engine.\nBegin moving.\nBut you have no destination.\nNo map.\nNo route.\nNo fuel estimate.\nYou are moving.\nBut you are not progressing.`,
    // Page 17
    `That is how many people manage money.\nMoney enters.\nMoney leaves.\nNo one is paying attention.\nNo one is measuring.\nNo one is evaluating.\nNo one is directing.\nFinancial awareness begins with understanding:\nWhat comes in.\nWhat goes out.\nWhat remains.\nWhat grows.\nWhat disappears.\nUntil money becomes visible, it remains difficult to manage.\n\nThe Third Layer of Soil: Vision\n\nEvery farmer plants with a picture of harvest in mind.\nNo farmer wakes up and randomly throws seeds around.\nThere is intention.\nThere is purpose.\nThere is a destination.`,
    // Page 18
    `The same applies to wealth.\nMany people know what they want today.\nFew know where they want to be ten years from now.\nWithout vision:\nIncome becomes consumption.\nWithout vision:\nOpportunities become distractions.\nWithout vision:\nMoney disappears into impulse decisions.\nVision transforms spending into strategy.\n\nThe Fourth Layer of Soil: Character\n\nCharacter is one of the most overlooked wealth principles.\nPeople often ask:\n"How can I make more money?"\nA better question is:\n"Can I manage more money?"\nMany people pray for increase.\nFew prepare for increase.\nThe habits that manage NGN 100,000 are often the same habits that manage NGN 1,000,000.\nMoney reveals character.`,
    // Page 19
    `If a farmer is careless, a larger farm simply creates larger losses.\nCharacter determines whether abundance becomes a blessing or a burden.\n\nThe Story of Two Builders\n\nTwo young men started businesses at the same time.\nOne focused on appearances.\nThe other focused on systems.\nThe first wanted to look successful.\nThe second wanted to become successful.\nThe first spent profits quickly.\nThe second reinvested carefully.\nFive years later, the difference was obvious.\nOne had memories.\nThe other had assets.\nOne harvested attention.\nThe other harvested wealth.\nThe difference was not intelligence.\nThe difference was preparation.\nOne prepared the soil.\nThe other decorated the soil.`,
    // Page 20
    `Financial Soil Assessment\n\nAsk yourself:\n1. Do I know exactly how much money enters my life each month?\n2. Do I know exactly how much money leaves my life each month?\n3. What financial goals am I working toward?\n4. What habits are helping me grow wealth?\n5. What habits are silently destroying wealth?\n6. Am I building assets or merely funding consumption?\n7. If my income doubled tomorrow, would my financial future truly improve?\n\nYour answers reveal the condition of your financial soil.\n\nMoney Farming Principle II\n\nA seed cannot overcome poor soil.\nLikewise, higher income cannot compensate for poor financial habits.\nBefore seeking a bigger harvest, prepare better soil.\nBecause wealth grows best where discipline, awareness, responsibility, vision, and character already exist.\nThe farmer who prepares the soil properly has already won half the battle before planting begins.\nAnd the same is true for wealth.`,
    // Page 21
    `CHAPTER 3: PLANTING WEALTH SEEDS\n\nThe Mechanic Nobody Noticed\n\nIn 2012, a young mechanic named Musa worked in a small workshop in Port Harcourt.\nHis shop was hidden behind a busy market.\nMost people passed by without noticing him.\nHis clothes were usually stained with engine oil.\nHis tools were old.\nHis income was modest.\nTo many observers, Musa looked like a man struggling to survive.\nWhat they could not see were the seeds he was planting.\nEvery evening after work, he stayed back.\nNot to repair vehicles.\nTo learn.\nHe borrowed manuals.\nWatched videos.\nAsked experienced mechanics questions.\nStudied newer vehicle technologies.\nWhile others spent their evenings entertaining themselves, Musa invested his evenings in knowledge.`,
    // Page 22
    `For years, nobody noticed.\nThen modern vehicles began flooding the market.\nMany mechanics struggled to adapt.\nBut Musa had already planted the seeds.\nCustomers started looking specifically for him.\nHis income multiplied.\nHis workshop expanded.\nEventually he opened a training center.\nThe harvest looked sudden.\nBut it wasn't.\nThe harvest had been growing underground for years.\nThat is how wealth often works.\nPeople celebrate harvests they never witnessed being planted.\n\nEvery Harvest Begins as a Seed\n\nA farmer understands a truth many people ignore.\nBefore there is abundance, there is planting.`,
    // Page 23
    `Before there is income, there is value.\nBefore there is wealth, there is investment.\nEvery financial breakthrough begins as a seed.\nThe challenge is that seeds rarely look impressive.\nA seed looks small.\nOrdinary.\nInsignificant.\nYet hidden inside a seed is the potential for an entire forest.\nThe same applies to wealth.\nA skill may look small today.\nA relationship may seem unimportant today.\nA book may appear insignificant today.\nAn idea may seem impossible today.\nBut within those seeds lies future abundance.`,
    // Page 24
    `Seed One:\n\nSkills\n\nSkills are among the most powerful wealth seeds available to anyone.\nMoney flows toward value.\nSkills create value.\nThe more valuable your skill, the greater your potential harvest.\nA person who solves a NGN 5,000 problem receives a smaller reward than someone who solves a NGN 5 million problem.\nThe market rewards usefulness.\nNot effort alone.\nNot intentions alone.\nNot wishes alone.\nUsefulness.\nThis is why two people can work equally hard yet experience completely different financial outcomes.\nOne possesses a highly valuable skill.\nThe other does not.\nThe lesson is simple:\nYour income often reflects the value of the problems you can solve.`,
    // Page 25
    `The Seed You Already Possess\n\nMany people underestimate what they already know.\nA teacher possesses knowledge.\nA carpenter possesses craftsmanship.\nA software developer possesses technical expertise.\nAn architect possesses design capability.\nAn entrepreneur possesses problem-solving ability.\n\n"Hidden inside a seed is the potential for an entire forest. Your income reflects the value of the problems you can solve."\n\n"Do I have a seed?"\nThe question is:\n"Am I planting it?"`,
    // Page 26
    `Seed Two:\n\nKnowledge\n\nKnowledge is fertilizer for every other seed.\nWithout knowledge, opportunities are often missed.\nWithout knowledge, mistakes become expensive.\nWithout knowledge, growth slows.\nThe wealthiest people in every generation understand the power of learning.\nThey read.\nStudy.\nObserve.\nAdapt.\nThe world changes constantly.\nThose who continue learning remain valuable.\nThose who stop learning gradually become irrelevant.\n\nThe Cost of Ignorance\n\nImagine two people receiving NGN 1 million.\nOne understands business.\nThe other does not.`,
    // Page 27
    `One understands investing.\nThe other does not.\nOne understands cash flow.\nThe other does not.\nFive years later, their financial outcomes will likely be very different.\nNot because of the money.\nBecause of what they knew.\nKnowledge determines how effectively you use opportunities.`,
    // Page 28
    `Seed Three:\n\nRelationships\n\nFarmers rarely succeed alone.\nThey rely on suppliers.\nWorkers.\nBuyers.\nExperts.\nCommunities.\nThe same applies to wealth.\nMany opportunities come through people.\nJobs come through people.\nBusiness partnerships come through people.\nReferrals come through people.\nMentorship comes through people.\nThe quality of your relationships influences the quality of opportunities available to you.\n\nThe Conversation That Changed Everything\n\nA young graduate attended a conference he almost skipped.\nHe knew nobody there.`,
    // Page 29
    `Felt uncomfortable.\nAlmost left early.\nThen he started a conversation with someone sitting beside him.\nThat conversation eventually led to an internship.\nThe internship led to employment.\nThe employment led to leadership opportunities.\nYears later, he often traced his career back to a single conversation.\nOne relationship became a seed.\nOne seed became a harvest.\nNever underestimate people.\nMany opportunities arrive disguised as relationships.`,
    // Page 30
    `Seed Four:\n\nOpportunities\n\nOpportunities are seeds many people overlook because they often arrive dressed as work.\nSome people pray for breakthroughs.\nThen ignore opportunities because they appear inconvenient.\nA farmer knows that harvest requires effort.\nLikewise, opportunity often requires action.\nMany successful businesses began as simple observations.\nSomeone noticed a problem.\nCreated a solution.\nServed people.\nAnd built value.\nOpportunities are everywhere.\nThe challenge is learning to recognize them.`,
    // Page 31
    `Seed Five:\n\nCharacter and Reputation\n\nImagine two people with identical skills.\nOne is trustworthy.\nThe other is unreliable.\nOne keeps promises.\nThe other breaks them.\nOne protects relationships.\nThe other damages them.\nWho do you think receives more opportunities?\nCharacter is a wealth seed.\nTrust is a wealth seed.\nIntegrity is a wealth seed.\nReputation is a wealth seed.\nMany people focus on making money.\nThe wisest people focus on becoming the kind of person money naturally follows.`,
    // Page 32
    `The Law of Seed Multiplication\n\nFarmers understand something remarkable.\nOne seed can produce hundreds more.\nOne maize seed produces multiple cobs.\nOne mango seed can eventually produce thousands of mangoes.\nWealth follows the same pattern.\nOne skill can produce income.\nThat income can buy knowledge.\nThat knowledge can create opportunities.\nThose opportunities can build businesses.\nThose businesses can create assets.\nAssets can generate wealth.\nThe secret is planting.\nNot merely possessing.`,
    // Page 33
    `WORKBOOK: Money Farming Action Step\n\nIdentify the seeds you currently possess in skills, knowledge, relationships, opportunities, and character. Which are you actively planting, and which are you neglecting?\n\nCreate five columns:\nSkills\nKnowledge\nRelationships\nOpportunities\nCharacter\n\nUnder each column, write every seed you currently possess.\nDo not underestimate yourself.\nDo not focus on what you lack.\nFocus on what you already have.\n\nThen ask:\nWhich of these seeds am I actively planting?\nWhich am I neglecting?\n\nThe future harvest you desire may already be in your hands.\nIt simply needs to be planted.`,
    // Page 34
    `Money Farming Principle III\n\nWealth does not begin with money. It begins with seeds. Skills, knowledge, relationships, opportunities, and character are the true seeds. Those who plant valuable seeds eventually enjoy harvests others call luck.`,
    // Page 35
    `CHAPTER 4: NURTURING GROWTH\n\nThe Bamboo Farmer's Dilemma\n\nIn a rural community, a farmer planted bamboo seeds on a piece of land he had carefully prepared.\nEvery morning he watered the soil.\nEvery evening he checked the field.\nA month passed.\nNothing appeared.\nThree months passed.\nStill nothing.\nSix months passed.\nThe land looked exactly the same.\nNeighbors laughed.\nFriends questioned his decision.\nSome suggested he had planted dead seeds.\nOthers advised him to give up and plant something else.\nBut the farmer continued.\nOne year passed.\nNothing.\nTwo years passed.`,
    // Page 36
    `Nothing.\nThree years passed.\nStill no visible growth.\nYet every morning he watered the soil.\nEvery evening he tended the field.\nThen something remarkable happened.\nThe bamboo finally emerged.\nWithin a short period, it grew rapidly.\nThe neighbors were amazed.\nThey called it an overnight success.\nBut the farmer knew better.\nThe growth had not started that year.\nThe growth had started years earlier beneath the surface.\nThe roots had been developing where nobody could see them.\nThe bamboo was not growing suddenly.\nIt was revealing what had already been happening underground.\nMany financial journeys follow the same pattern.\nPeople see the visible success.\nThey rarely see the invisible preparation.\n\nWhy Most People Quit Too Early`,
    // Page 37
    `The greatest enemy of wealth is not failure.\nIt is impatience.\nMany people plant seeds.\nFew remain long enough to see harvest.\nThey start businesses.\nThen quit after six months.\nThey learn new skills.\nThen stop when progress feels slow.\nThey begin investing.\nThen withdraw when returns seem insignificant.\nThey start writing books.\nThen abandon the process because results are not immediate.\nThe problem is not the seed.\nThe problem is the expectation.\nMany people expect harvest during planting season.\nFarmers understand that seasons exist for a reason.\n\nThe Invisible Growth Season\n\nOne of the most frustrating realities of life is that progress often becomes visible only after it has been happening for a long time.\nConsider a child learning to read.`,
    // Page 38
    `For months it seems as though nothing is changing.\nThen suddenly the child begins reading fluently.\nThe growth was happening all along.\nConsider an athlete.\nHours of training produce little visible difference at first.\nThen one day performance improves dramatically.\nThe growth was happening all along.\nConsider a business owner.\nMonths of effort produce few customers.\nThen momentum begins.\nThe growth was happening all along.\n\n"Never confuse invisible progress with the absence of progress. Small actions repeated over time create extraordinary results."\n\nThe Story of the Tailor\n\nA young tailor named Ada opened a small fashion shop.\nThe first few months were difficult.\nCustomers were scarce.\nIncome was inconsistent.\nSome days she questioned whether she had made the right decision.`,
    // Page 39
    `But she continued improving.\nShe studied modern designs.\nImproved customer service.\nDelivered quality work.\nAsked for feedback.\nBuilt relationships.\nFor nearly two years, growth was slow.\nThen something changed.\nSatisfied customers began referring others.\nSocial media visibility increased.\nCorporate clients emerged.\nWithin a few years, the same shop that struggled for attention became fully booked.\nMany people called her lucky.\nBut luck had little to do with it.\nWhat they saw was harvest.\nWhat they missed was cultivation.`,
    // Page 40
    `Water One:\n\nConsistency\n\nA farmer does not water crops once and expect abundance.\nGrowth requires repetition.\nConsistency is one of the most underrated wealth principles.\nThe market rewards people who continue showing up.\nNot occasionally.\nConsistently.\nA person who reads ten pages daily often learns more than someone who reads an entire book once every six months.\nA business that serves customers consistently builds trust.\nA professional who improves consistently becomes valuable.\nSmall actions repeated over time create extraordinary results.\n\nThe Mathematics of Growth\n\nImagine improving by just one percent every day.\nThe improvement feels insignificant.\nAlmost invisible.\nYet over time the compound effect becomes extraordinary.\nMany people underestimate what consistency can achieve because daily progress feels too small.`,
    // Page 41
    `Farmers understand that harvest is rarely the result of one dramatic action.\nIt is usually the result of many small actions repeated faithfully.`,
    // Page 42
    `Water Two:\n\nDiscipline\n\nMotivation is useful.\nDiscipline is essential.\nMotivation comes and goes.\nDiscipline remains.\nFarmers do not wait until they feel inspired before tending crops.\nThe crops require attention whether the farmer feels motivated or not.\nThe same applies to wealth building.\nThere will be days when learning feels difficult.\nDays when business is slow.\nDays when opportunities seem absent.\nDays when progress feels invisible.\nDiscipline keeps you moving during those seasons.`,
    // Page 43
    `Water Three:\n\nLearning and Adaptation\n\nFarmers constantly learn.\nWeather patterns change.\nMarkets change.\nTechnologies change.\nSuccessful farmers adapt.\nSuccessful wealth builders do the same.\nWhat worked ten years ago may not work today.\nIndustries evolve.\nCustomer needs evolve.\nTechnology evolves.\nPeople who continue learning remain relevant.\nPeople who stop learning often become outdated.\nGrowth requires adaptation.`,
    // Page 44
    `Water Four:\n\nPatience\n\nPatience is not passive waiting.\nPatience is active persistence.\nIt is continuing to plant, water, and nurture despite not seeing immediate results.\nPatience does not mean doing nothing.\nPatience means doing the right things long enough for results to appear.\nMany people abandon their dreams inches away from breakthrough because they mistake delayed results for failure.\nFarmers know better.\nThey trust the process.\n\nThe Danger of Digging Up Seeds\n\nImagine planting maize today.\nTomorrow you dig it up to check progress.\nThe next day you dig it up again.\nAnd again.\nEventually you destroy the seed.\nMany people do the same with their goals.\nThey constantly change direction.`,
    // Page 45
    `Jump from one opportunity to another.\nStart and stop repeatedly.\nMove from one business idea to the next before giving any of them time to mature.\nGrowth requires commitment.\nConstant interruption kills momentum.\n\nThe Harvest Mindset\n\nPeople who succeed financially understand something powerful:\nGrowth is a process.\nNot an event.\nThe entrepreneur you admire once struggled.\nThe author you respect once wrote unseen pages.\nThe investor you envy once started with a small amount.\nThe leader you celebrate once felt uncertain.\nEvery harvest has a hidden history.\nEvery success has an invisible season.\nEvery achievement has roots beneath the surface.\n\nReflection Questions\n1. What seeds have I planted recently?`,
    // Page 46
    `2. Have I given those seeds enough time to grow?\n3. What habits am I practicing consistently?\n4. Where am I expecting instant results?\n5. What would happen if I stayed committed for another year?\n\nMoney Farming Action Step\n\nIdentify one wealth seed you planted in the last twelve months and identify three actions to nurture it.\n\nIt could be:\n- A skill\n- A business\n- A book\n- An investment\n- A relationship\n- A career path\n\nThen ask yourself:\n"Am I nurturing this seed consistently, or am I abandoning it too soon?"\nWrite down three actions you will take this week to nurture that seed.\nSmall actions matter.\nRepeated actions matter more.`,
    // Page 47
    `Money Farming Principle IV\n\nSeeds grow when they are nurtured.\nLikewise, wealth grows when skills, opportunities, relationships, and ideas receive consistent attention.\nThe people who enjoy extraordinary harvests are rarely the people who planted the most seeds.\nThey are usually the people who nurtured their seeds the longest.\nBecause in both farming and wealth creation, the greatest rewards often belong to those who refuse to quit before the harvest arrives.`,
    // Page 48
    `CHAPTER 5: REMOVING FINANCIAL WEEDS\n\nThe Farm That Should Have Flourished\n\nIn a community on the outskirts of Benin City lived a farmer named Okoro.\nFor years, he was known for having some of the most fertile land in the area.\nThe soil was rich.\nThe rainfall was favorable.\nThe seeds were high quality.\nEverything seemed positioned for success.\nYet every harvest season, his yields were disappointing.\nHis neighbors were confused.\nHow could someone with such good land produce such poor results?\nOne season, an agricultural officer visited his farm.\nAfter a careful inspection, the problem became obvious.\nThe issue was not the soil.\nThe issue was not the seeds.\nThe issue was not the weather.\nThe farm was overrun with weeds.\nThe weeds were stealing nutrients.`,
    // Page 49
    `Stealing water.\nStealing sunlight.\nEverything intended for the crops was being consumed by unwanted growth.\nThe farmer had focused so much on planting that he neglected removing what was destroying the harvest.\nMany people do the same with money.\nThey work hard.\nLearn skills.\nStart businesses.\nCreate opportunities.\nYet wealth never seems to grow.\nNot because they lack seeds.\n\n"Wealth never seems to grow when financial weeds are silently consuming everything intended for the crops."\n\nBut because financial weeds are silently consuming their harvest.\n\nWhat Are Financial Weeds?\n\nFinancial weeds are habits, behaviors, and decisions that quietly destroy wealth.\nUnlike major financial disasters, weeds often go unnoticed.\nThey grow gradually.`,
    // Page 50
    `Quietly.\nPatiently.\nUntil one day they have consumed opportunities that should have produced abundance.\nThe dangerous thing about weeds is that they often appear harmless at first.\nA little unnecessary spending.\nA little procrastination.\nA little debt.\nA little carelessness.\nA little comparison.\nOver time, these small habits become major obstacles.`,
    // Page 51
    `Weed One:\n\nLifestyle Inflation\n\nWhen Chika got promoted, she promised herself she would save and invest the additional income.\nBut something else happened.\nShe upgraded her apartment.\nBought a more expensive car.\nIncreased her entertainment budget.\nChanged her shopping habits.\nWithin months, her higher salary had disappeared into a higher lifestyle.\nHer income increased.\nHer wealth did not.\nThis is one of the most common financial weeds.\nAs income grows, expenses grow at the same pace--or faster.\nThe result is a person who earns more but never becomes wealthier.\nA farmer who consumes every harvest remains trapped in the same cycle season after season.\nGrowth requires preserving seeds.\nNot consuming everything.`,
    // Page 52
    `Weed Two:\n\nBad Debt\n\nDebt is not always harmful.\nSome debt can create assets and opportunities.\nHowever, destructive debt behaves like an aggressive weed.\nIt spreads quickly.\nConsumes resources.\nAnd limits future growth.\nMany people are paying today for decisions made years ago.\nThey are financing lifestyles they could not afford.\nPurchasing liabilities instead of assets.\nBorrowing for consumption rather than growth.\nThe danger of debt is not merely the money borrowed.\nThe danger is the future opportunities sacrificed.\nEvery naira used to service unnecessary debt is a seed that cannot be planted elsewhere.\n\nThe Cost of One Decision\n\nA young professional purchased a luxury vehicle far beyond his means.\nThe monthly repayments consumed a significant portion of his income.`,
    // Page 53
    `For years he appeared successful.\nBut behind the appearance was constant pressure.\nInvestment opportunities passed by.\nBusiness opportunities were ignored.\nSavings remained nonexistent.\nThe car created admiration.\nBut it also created limitation.\nWhat looked like success was quietly stealing his future harvest.`,
    // Page 54
    `Weed Three:\n\nProcrastination\n\nFew weeds are as destructive as procrastination.\nMany people know exactly what they should do.\nThey simply postpone doing it.\nThe business idea waits.\nThe course remains unfinished.\nThe investment is delayed.\nThe book remains unwritten.\nThe opportunity expires.\nDays become weeks.\nWeeks become months.\nMonths become years.\nAnd potential harvests never materialize.\nThe tragedy of procrastination is not lost time.\nIt is lost possibility.\n\nThe Opportunity That Never Returned\n\nA young graduate once had an opportunity to join a growing technology startup.`,
    // Page 55
    `The role offered little pay initially but tremendous learning potential.\nHe delayed his decision.\nWanted more time.\nWanted greater certainty.\nWanted perfect conditions.\nBy the time he responded, the position had been filled.\nYears later, the company became one of the fastest-growing businesses in its industry.\nThe opportunity had been a seed.\nHis delay prevented planting.`,
    // Page 56
    `Weed Four:\n\nFear\n\nFear has buried more dreams than failure ever has.\nFear of rejection.\nFear of criticism.\nFear of loss.\nFear of uncertainty.\nFear convinces people to remain where they are rather than pursue where they could be.\nMany individuals spend years waiting until they feel ready.\nThe truth is that very few people ever feel completely ready.\nFarmers plant despite uncertainty.\nThey cannot control every factor.\nBut they plant anyway.\nLikewise, wealth builders act despite fear.`,
    // Page 57
    `Weed Five:\n\nComparison\n\nOne of the fastest ways to destroy financial progress is to compare your journey with someone else's highlight reel.\nSocial media has intensified this problem.\nPeople compare their beginnings to another person's middle.\nTheir struggles to another person's success.\nTheir reality to another person's presentation.\nComparison often creates pressure to spend money for appearances rather than purpose.\nMany financial mistakes are born from the desire to impress people who are not paying attention.\nA farmer who constantly stares at another person's farm eventually neglects his own.`,
    // Page 58
    `Weed Six:\n\nLack of Financial Education\n\nMany people work for money their entire lives without learning how money works.\nThey understand how to earn.\nBut not how to grow.\nNot how to invest.\nNot how to multiply.\nNot how to protect.\nFinancial ignorance is expensive.\nThe cost is often invisible until years later.\nKnowledge may require effort.\nIgnorance usually requires a greater price.\n\nThe Silent Drain\n\nImagine a bucket filled with water.\nYou pour more water into it every day.\nYet the bucket never becomes full.\nEventually you discover several holes at the bottom.\nThe problem was never the amount of water entering.`,
    // Page 59
    `The problem was what was leaking.\nMany people focus exclusively on earning more.\nFew examine what is draining their wealth.\nIncome matters.\nBut removing leaks matters too.`,
    // Page 60
    `The Courage to Weed\n\nRemoving weeds is rarely comfortable.\nIt requires honesty.\nDiscipline.\nSelf-awareness.\nDifficult decisions.\nSometimes it means changing habits.\nSometimes it means reducing expenses.\nSometimes it means ending unhealthy financial patterns.\nSometimes it means saying no to appearances in order to say yes to long-term abundance.\nYet every healthy farm requires weeding.\nAnd every healthy financial future requires the same.\n\nReflection Questions\n1. What financial weed is causing the most damage in my life?\n2. Am I increasing my lifestyle as quickly as I increase my income?\n3. What opportunity have I delayed because of fear or procrastination?\n4. What habits are silently draining my resources?\n5. Am I spending to build wealth or spending to impress others?`,
    // Page 61
    `WORKBOOK: Money Farming Action Step\n\nPerform a Financial Weed Audit. Identify one habit to eliminate immediately--the one behavior that steals the most time or opportunity from your future harvest.\n\nCreate three columns:\n- Habits to Keep\n- Habits to Reduce\n- Habits to Eliminate\n\nBe brutally honest.\nIdentify every behavior that steals time, money, energy, or opportunity.\nThen choose one weed to remove immediately.\n\nRemember:\nA healthy harvest is not only about what you plant.\nIt is also about what you remove.`,
    // Page 62
    `Money Farming Principle V\n\nGreat wealth builders do not simply create income; they identify and eliminate the habits and behaviors that quietly destroy growth. Sometimes the fastest way to increase your harvest is to remove what has been stealing it.`,
    // Page 63
    `CHAPTER 6: HARVESTING WEALTH\n\nThe Farmer Who Refused to Celebrate\n\nThe villagers thought something was wrong with Chief Nwosu.\nAfter years of hard work, his farm had finally produced its largest harvest.\nThe barns were full.\nBuyers traveled from distant towns to purchase his produce.\nHis profits exceeded anything he had earned before.\nYet while everyone expected a grand celebration, Chief Nwosu remained unusually calm.\nOne evening, a young farmer approached him.\n"Chief, why aren't you celebrating? This is the biggest harvest you've ever had."\nThe old farmer smiled.\n"I am celebrating."\nThe young man looked confused.\n"Then why aren't you spending the money?"\nChief Nwosu pointed toward another section of land.\n"Because next season has already started."\nThe young farmer followed his gaze.\nWorkers were already preparing new fields.\nNew seeds had already been purchased.\nNew irrigation systems were being installed.`,
    // Page 64
    `The old farmer understood something many people never learn:\nA harvest is not the end of the journey.\nA harvest is a test.\nWhat you do after the harvest determines whether wealth grows or disappears.\n\nWhy Many People Lose Their Harvest\n\nMost people dream about making money.\nFew prepare for what happens after they make it.\nThey imagine the promotion.\nThe successful business.\nThe large contract.\nThe investment returns.\nThe financial breakthrough.\nBut when the harvest arrives, they often make one critical mistake:\nThey consume what should have been multiplied.\nThis is why some people earn millions yet remain financially fragile.\nThe issue is not their ability to earn.\nThe issue is their ability to manage harvest.\n\nThe Difference Between Income and Wealth`,
    // Page 65
    `Many people use these words interchangeably.\nThey are not the same.\nIncome is what you earn.\nWealth is what you keep, grow, and own.\nA person may have a high income and little wealth.\nAnother person may have moderate income but substantial wealth.\nOne focuses on earning.\nThe other focuses on accumulating assets.\nImagine two brothers.\nBoth earn NGN 500,000 monthly.\nThe first spends almost everything.\nThe second invests part of his earnings into assets.\nTen years later, their financial lives will look dramatically different.\nThe difference is not income.\nThe difference is stewardship.`,
    // Page 66
    `Harvest One:\n\nRecognizing Your Harvest\n\nMany people overlook harvest because it does not always arrive as cash.\nSometimes harvest appears as:\n- New skills\n- Valuable relationships\n- Increased confidence\n- Business opportunities\n- Industry reputation\n- Knowledge and expertise\nMoney is only one form of harvest.\nSome of the most profitable opportunities begin as non-financial rewards.\nThe mentor you meet today may become tomorrow's business partner.\nThe skill you develop today may become tomorrow's income stream.\nThe relationship you build today may unlock future opportunities.\nWise people recognize harvest in all its forms.\n\nThe Story of the Young Speaker\n\nA young speaker was invited to address a small audience.\nThere was no payment.\nThe event was modest.`,
    // Page 67
    `Many people advised him not to attend.\nThey believed the opportunity lacked value.\nHe accepted anyway.\nUnknown to him, someone in the audience managed a large organization.\nImpressed by his presentation, the manager later invited him to conduct corporate training.\nWhat began as a free engagement eventually generated significant income.\nThe first harvest was not money.\nThe first harvest was exposure.\nAnd exposure produced opportunity.`,
    // Page 68
    `Harvest Two:\n\nTurning Income into Assets\n\nOne of the most important lessons in Money Farming is this:\nIncome feeds you.\nAssets free you.\nIncome requires effort.\nAssets continue producing value over time.\nExamples include:\n- Businesses\n- Investments\n- Intellectual property\n- Rental properties\n- Digital products\n- Books\n- Valuable brands\nAssets behave like productive farmland.\nThey continue generating returns long after the initial effort.\nThe wealthy often focus less on consumption and more on asset creation.\n\nThe Book That Became a Farm\n\nAn author spent months writing a book.`,
    // Page 69
    `The process was difficult.\nThe income was uncertain.\nMany people questioned whether the effort was worthwhile.\nYears later, the same book continued generating revenue.\nIt attracted speaking engagements.\nBuilt credibility.\nOpened business opportunities.\nCreated partnerships.\nThe book became more than a product.\nIt became an asset.\nThis is the power of wealth farming.\nOne seed can continue producing harvest long after it is planted.`,
    // Page 70
    `Harvest Three:\n\nMultiple Streams of Income\n\nA wise farmer rarely depends on one crop.\nIf weather damages one harvest, another may survive.\nLikewise, relying entirely on one source of income creates vulnerability.\nLife is unpredictable.\nIndustries change.\nEconomies fluctuate.\nOpportunities shift.\nMultiple income streams create resilience.\nExamples include:\n- Salary\n- Business income\n- Consulting\n- Investments\n- Royalties\n- Digital products\n- Real estate\nThe goal is not complexity.\nThe goal is stability.\nA diversified harvest provides greater security.`,
    // Page 71
    `The Lesson from the Pandemic\n\nDuring difficult economic periods, many people discovered the risk of depending on a single income source.\nSome businesses closed.\nSome industries slowed.\nSome jobs disappeared.\nYet individuals with multiple streams of income often adapted more effectively.\nThe lesson became clear:\nA farmer with several crops is usually more secure than one relying on a single field.`,
    // Page 72
    `Harvest Four:\n\nReinvestment\n\nOne of the defining habits of wealth builders is reinvestment.\nWhen harvest arrives, they ask:\n"How much of this should be planted again?"\nThis mindset separates temporary success from lasting wealth.\nEvery harvest contains three possibilities:\nConsume it.\nSave it.\nMultiply it.\nThe most successful people prioritize multiplication.\nThey understand that today's harvest can become tomorrow's abundance.\n\nThe Business Owner's Choice\n\nA business owner experienced his most profitable year.\nFor the first time, he had enough money to purchase luxury items he had always desired.\nInstead, he reinvested a significant portion into improving systems, training employees, and expanding operations.\nThe decision required discipline.\nBut within a few years, the business had multiplied several times over.`,
    // Page 73
    `The sacrifice of immediate gratification produced greater long-term rewards.`,
    // Page 74
    `Harvest Five:\n\nBuilding Systems\n\nMany people build income.\nFew build systems.\nIncome depends on effort.\nSystems create consistency.\nA system is any process that continues creating value even when you are not actively working.\nExamples include:\n- Automated businesses\n- Training programs\n- Books\n- Digital platforms\n- Intellectual property\n- Teams and organizations\nThe ultimate goal of Money Farming is not merely to work harder.\nIt is to create systems that continue producing harvest.\nFarmers eventually move beyond planting by hand.\nThey build irrigation systems.\nStorage facilities.\nDistribution networks.\nLikewise, wealth builders create structures that multiply their efforts.`,
    // Page 75
    `Reflection Questions\n\n1. What forms of harvest currently exist in my life?\n2. Am I consuming too much of my harvest?\n3. What assets am I building?\n4. How many income streams support my financial future?\n5. What system could I create that continues producing value over time?\n\nMoney Farming Action Step\n\nCreate a "Harvest Plan" by dividing your income source into Consume, Save, and Multiply categories.\nDivide a sheet into three sections:\n- Consume\n- Save\n- Multiply\nFor every income source you receive this month, decide beforehand how much belongs in each category.\nDo not wait until the money arrives.\nPlan before the harvest comes.\nThe farmer who plans for harvest manages abundance wisely.\nThe farmer who does not plan often loses it.`,
    // Page 76
    `Money Farming Principle V\n\nHarvest is not measured by how much money you make.\nHarvest is measured by how much value you create, how much wealth you preserve, and how effectively you multiply what you receive.\nTrue wealth belongs to those who transform harvest into future harvests.\nBecause the goal of Money Farming is not simply earning more.\nThe goal is creating a cycle of continuous abundance.`,
    // Page 77
    `CHAPTER 7: REPLANTING FOR GENERATIONAL WEALTH\n\nThe Old Man's Final Harvest\n\nThe village gathered beneath a large tree to celebrate the life of Pa Eze.\nFor over forty years, he had been one of the most respected farmers in the region.\nHis farms stretched across several acres.\nHis harvests were legendary.\nHis wisdom was widely sought.\nAs family members prepared to distribute his estate, one of his grandsons asked a question.\n"What was Grandpa's greatest achievement?"\nSome pointed to the farmland.\nOthers mentioned the houses he built.\nA few spoke about the businesses he owned.\nBut an elderly friend who had known Pa Eze for decades shook his head.\n"No."\nThe crowd turned toward him.\n"The greatest thing he left behind was not what he owned."\nHe pointed toward Pa Eze's children and grandchildren.\n"It was what he taught."`,
    // Page 78
    `Silence filled the gathering.\nThe old man continued.\n"He taught his children how to think, how to work, how to save, how to invest, and how to build. The farms may disappear. The houses may change ownership. The money may come and go. But the knowledge he planted in people will continue producing harvests long after we are gone."\nThat day, the family understood something powerful.\nThe greatest harvest is not what you leave for people.\nThe greatest harvest is what you leave in people.\n\nBeyond Personal Success\n\nMany people spend their lives pursuing financial success.\nThat is important.\nBut Money Farming is not complete when wealth is accumulated.\nIt is complete when wealth can survive beyond the individual who created it.\nA farmer who consumes every harvest leaves little behind.\nA farmer who replants creates future harvests.\nThe same principle applies to wealth.\nThe question is not simply:\n"How much can I earn?"\nThe deeper question is:\n"What will remain after me?"`,
    // Page 79
    `The Difference Between Riches and Legacy\n\nRiches can disappear in a generation.\nLegacy can endure for centuries.\nHistory is filled with examples of families that inherited wealth but lacked the wisdom required to sustain it.\nThe money disappeared.\nThe assets disappeared.\nThe opportunities disappeared.\nWhy?\nBecause wealth was transferred.\nWisdom was not.\nMoney without wisdom is like giving seeds to someone who has never learned farming.\nEventually the seeds are consumed instead of planted.`,
    // Page 80
    `Replanting Principle One:\n\nTeach What You Know\n\nOne of the greatest mistakes people make is assuming that others automatically know what they know.\nThey don't.\nKnowledge must be intentionally transferred.\nIf you have learned lessons about money, business, discipline, leadership, or life, teach them.\nTeach your children.\nTeach your employees.\nTeach your mentees.\nTeach your community.\nThe farmer who teaches others how to plant multiplies harvests beyond his own field.\n\nThe Apprentice\n\nA successful carpenter owned one of the busiest workshops in town.\nFor years he focused entirely on building furniture.\nOne day he realized something.\nIf he died, his knowledge would die with him.\nSo he began training apprentices.\nThe process was slow.`,
    // Page 81
    `Sometimes frustrating.\nBut over time, those apprentices became masters themselves.\nYears later, his influence extended far beyond his own workshop.\nHis harvest had multiplied through people.\nThat is legacy.`,
    // Page 82
    `Replanting Principle Two:\n\nBuild Systems, Not Dependence\n\nMany businesses collapse when the founder leaves.\nWhy?\nBecause everything depends on one person.\nTrue wealth requires systems.\nA system is something that continues functioning even when you are absent.\nExamples include:\n- Documented processes\n- Trained teams\n- Educational programs\n- Books\n- Intellectual property\n- Digital platforms\nSystems transform individual effort into lasting impact.\nThe farmer who builds irrigation systems creates value long after he stops carrying water.`,
    // Page 83
    `Replanting Principle Three:\n\nCreate Assets That Outlive You\n\nSome assets continue producing harvests for years.\nSometimes decades.\nSometimes generations.\nA book can continue teaching readers long after the author is gone.\nA business can continue serving customers.\nA property can continue generating income.\nAn investment can continue growing.\nA scholarship fund can continue transforming lives.\nThe question is:\n"What am I building today that can still create value tomorrow?"\n\nThe Author's Legacy\n\nA writer spends months creating a book.\nThe process feels exhausting.\nAt times it seems insignificant.\nThen years later, a reader encounters that book.\nThe ideas change a life.`,
    // Page 84
    `That life influences others.\nThe ripple continues.\nThe author may never meet those people.\nYet the harvest continues.\nThat is the power of creating assets that outlive you.`,
    // Page 85
    `Replanting Principle Four:\n\nBuild a Legacy of Values\n\nMoney is important.\nBut values determine how money is used.\nA family that inherits wealth without discipline often loses wealth.\nA family that inherits wealth and values often multiplies it.\nThe most valuable inheritance is not money.\nIt is character.\nIntegrity.\nResponsibility.\nDiscipline.\nGenerosity.\nService.\nThese values become the roots that sustain future harvests.\n\nThe Family Business\n\nA father spent thirty years building a successful enterprise.\nWhen he retired, people assumed the business would struggle.\nInstead, it continued growing.`,
    // Page 86
    `Why?\nBecause he had spent years teaching his children more than operational skills.\nHe taught them values.\nHe taught them stewardship.\nHe taught them responsibility.\nThe business survived because the roots were strong.\nStrong roots support future harvests.`,
    // Page 87
    `Replanting Principle Five:\n\nBecome a Person of Multiplication\n\nMany people focus on accumulation.\nMoney Farming focuses on multiplication.\nAccumulation asks:\n"How much can I gather?"\nMultiplication asks:\n"How much can I grow?"\nAccumulation focuses on possession.\nMultiplication focuses on impact.\nThe greatest wealth builders understand that true success is measured not only by personal gain but by collective growth.\nThey help others rise.\nThey create opportunities.\nThey build communities.\nThey leave things better than they found them.\n\nThe Forest Principle\n\nA single tree may produce fruit.\nA forest transforms an ecosystem.`,
    // Page 88
    `The goal of Money Farming is not merely to become a successful tree.\nThe goal is to plant a forest.\nTo create opportunities that continue growing.\nTo build systems that continue serving.\nTo transfer wisdom that continues multiplying.\nTo leave a legacy that continues producing harvests.\n\nReflection Questions\n1. What knowledge am I passing on to others?\n2. If I were absent tomorrow, what would continue functioning?\n3. What assets am I building that can outlive me?\n4. What values am I transferring to the next generation?\n5. Am I accumulating wealth or multiplying impact?`,
    // Page 89
    `WORKBOOK: Money Farming Action Step\n\nCreate your Legacy List: choose one person to mentor, one long-term asset to build, and one core value you want future generations to remember.\n\nWrite down:\n- One person you will intentionally mentor.\n- One asset you will begin building this year.\n- One system you will improve.\n- One lesson you want future generations to remember.\n\nThen take action immediately.\nLegacy is not built someday.\nIt is built today.`,
    // Page 90
    `Money Farming Principle VII\n\nSuccess is not a destination; it is a cycle. Plant, grow, protect, harvest, replant, and repeat.\nTrue wealth belongs to those whose influence and wisdom continue producing harvests long after they are gone.\nLikewise, true wealth builders understand that success is not a destination.\nIt is a cycle.\nPlant.\nGrow.\nProtect.\nHarvest.\nReplant.\nAnd repeat.\nThe wealthiest individuals are not necessarily those who possess the most money.\nThey are often those whose influence, wisdom, systems, and values continue producing harvests long after they are gone.\nThat is the highest form of Money Farming.\nThat is generational wealth.\nThat is legacy.`,
    // Page 91
    `CONCLUSION: THE NEXT PLANTING SEASON\n\nThe sun was setting.\nThe young man sat quietly beside the old farmer.\nThe same farmer who had handed him a handful of seeds years earlier.\nThe same farmer who taught him lessons about wealth that no classroom had ever explained.\nMuch had changed since that conversation.\nThe young man was no longer struggling financially.\nHe had built a business.\nDeveloped valuable skills.\nCreated multiple streams of income.\nLearned to save.\nLearned to invest.\nLearned to create value.\nMost importantly, he had learned to think differently.\nAs they sat together, he looked toward the fields stretching into the distance.\nSome had recently been harvested.\nOthers were being prepared for planting.\nA few contained young crops just beginning to emerge.\nThe farmer broke the silence.`,
    // Page 92
    `"What do you see?"\nThe young man smiled.\n"I see different seasons."\nThe farmer nodded.\n"And what does that teach you?"\nThe young man thought carefully.\nThen he answered.\n"That the harvest is not the end."\nThe old farmer smiled.\nFor the first time, the student had become the teacher.\n\nThe Journey You Have Taken\n\nThroughout this book, you have traveled through the complete cycle of Money Farming.\nYou learned that wealth begins with understanding.\nYou discovered that before planting seeds, you must prepare the soil.\nYou learned how valuable seeds are hidden inside skills, knowledge, opportunities, relationships, and character.\nYou discovered the importance of nurturing growth through consistency, discipline, learning, and patience.\nYou learned how financial weeds silently destroy wealth and how removing them protects future harvests.\nYou explored how wealth is harvested, multiplied, and transformed into assets.`,
    // Page 93
    `Finally, you learned that true success extends beyond personal gain into legacy and generational impact.\n\nThe principles may sound simple.\nBecause they are.\nBut simplicity should never be mistaken for weakness.\nEntire forests emerge from simple seeds.\nEntire fortunes emerge from simple habits.\nEntire legacies emerge from simple decisions repeated consistently over time.\n\nThe Great Wealth Myth\n\nMany people spend their lives searching for a secret formula.\nA shortcut.\nA hidden opportunity.\nA magical breakthrough.\nThey believe wealth belongs to a select few.\nThe lucky.\nThe connected.\nThe gifted.\nBut history tells a different story.\nMost lasting wealth was built.\nPatiently.`,
    // Page 94
    `Deliberately.\nConsistently.\nThe farmer understands this better than anyone.\nHe does not pray for harvest while refusing to plant.\nHe does not blame the soil while neglecting preparation.\nHe does not expect fruit from seeds planted yesterday.\nHe respects the process.\nAnd the process rewards him.\nMoney works the same way.\n\nThe Question That Changes Everything\n\nPerhaps the most important question in this entire book is not:\n"How much money do I have?"\nNor is it:\n"How much money do I want?"\nThe question is:\n"What am I planting today?"\nBecause your future harvest is hidden inside your present actions.\nThe skill you are learning today.\nThe relationship you are building today.\nThe book you are writing today.`,
    // Page 95
    `The business you are starting today.\nThe discipline you are developing today.\nThe investments you are making today.\nThese are the seeds from which future abundance grows.\n\nThere Will Always Be Another Season\n\nOne of the greatest lessons from farming is that life moves in seasons.\nThere will be planting seasons.\nThere will be growing seasons.\nThere will be waiting seasons.\nThere will be harvest seasons.\nSome seasons will feel exciting.\nOthers will feel difficult.\nSome seasons will produce extraordinary results.\nOthers will teach valuable lessons.\nDo not become discouraged when growth feels slow.\nDo not become arrogant when harvest arrives.\nEvery season has a purpose.\nEvery season contains a lesson.\nEvery season prepares you for the next.`,
    // Page 96
    `Your Money Farming Commitment\n\nAs you close this book, make a commitment to yourself.\nCommit to becoming a lifelong farmer.\nCommit to planting valuable seeds.\nCommit to nurturing growth.\nCommit to removing weeds.\nCommit to multiplying harvests.\nCommit to building assets.\nCommit to transferring wisdom.\nCommit to leaving a legacy.\nThe world does not need more people chasing money.\nThe world needs more people creating value.\nBecause value creates wealth.\nAnd wealth creates opportunities.\nAnd opportunities create transformation.\n\nA Final Story\n\nMany years from now, imagine someone asking about your life.\nImagine they ask:\n"What did this person leave behind?"`,
    // Page 97
    `Will the answer be limited to money?\nOr will it include lives changed?\nBusinesses built?\nKnowledge shared?\nProblems solved?\nCommunities strengthened?\nFuture generations empowered?\nThe greatest farmers are remembered not because of what they harvested.\nThey are remembered because of what they planted.\n\nFinal Reflection\n\nAs you turn this final page, pause and ask yourself:\nWhat seed am I carrying?\nWhat soil am I preparing?\nWhat harvest am I building?\nWhat legacy am I leaving?\nThen begin.\nNot tomorrow.\nNot next month.\nNot when conditions are perfect.\nBegin today.`,
    // Page 98
    `Because every great harvest starts exactly the same way.\nWith one seed.\nOne decision.\nOne action.\nOne planting season.\nAnd your next planting season begins now.`,
    // Page 99
    `FINAL MONEY FARMING DECLARATION\n\nI will not merely earn money.\nI will create value.\nI will not consume every harvest.\nI will preserve seeds for the future.\nI will nurture growth with patience and discipline.\nI will remove habits that destroy abundance.\nI will build assets, not just income.\nI will multiply opportunities for myself and others.\nI will leave behind wisdom, impact, and legacy.\nI am a Money Farmer.\nAnd I understand that true wealth is grown.`,
    // Page 100
    `ABOUT THE AUTHOR\n\nZeki Ubor\n\nZeki Ubor is a transformational trainer, author, entrepreneur, architect, and technology professional passionate about helping individuals discover their value, maximize their potential, and create lasting impact.\n\nThrough his teachings, books, training programs, and business ventures, he has dedicated his work to helping people build lives of purpose, productivity, and significance.\n\nHe is the creator of transformational initiatives focused on personal growth, leadership development, value creation, and wealth-building principles.\n\nIn Money Farming, Zeki combines timeless lessons from farming with practical principles of wealth creation to provide a framework for building sustainable financial success and generational impact.\n\nHis message is simple:\nGreat harvests are never accidental.\nThey are cultivated.\n\nPlant wisely.\nGrow intentionally.\nHarvest abundantly.\nLeave a legacy.`
  ];

  const getPageTitle = (pNum) => {
    if (pNum === 1) return "Cover";
    if (pNum === 2) return "Dedication & Contents";
    if (pNum >= 3 && pNum <= 6) return "Introduction";
    if (pNum >= 7 && pNum <= 12) return "Chapter 1";
    if (pNum >= 13 && pNum <= 20) return "Chapter 2";
    if (pNum >= 21 && pNum <= 34) return "Chapter 3";
    if (pNum >= 35 && pNum <= 47) return "Chapter 4";
    if (pNum >= 48 && pNum <= 62) return "Chapter 5";
    if (pNum >= 63 && pNum <= 76) return "Chapter 6";
    if (pNum >= 77 && pNum <= 90) return "Chapter 7";
    if (pNum >= 91 && pNum <= 98) return "Conclusion";
    if (pNum === 99) return "Declaration";
    return "About the Author";
  };

  for (let i = 0; i < rawPages.length; i++) {
    const pageNum = i + 1;
    const page = pdfDoc.addPage([612, 792]);
    const { width: pageW, height: pageH } = page.getSize();
    const pageText = rawPages[i];
    const pageTitle = getPageTitle(pageNum);

    if (pageNum === 1) {
      let hasImageCover = false;
      try {
        const imgPath = path.join(__dirname, '..', 'public', 'cover_money_farming.png');
        if (fs.existsSync(imgPath)) {
          const imgBytes = fs.readFileSync(imgPath);
          const embeddedImg = await pdfDoc.embedPng(imgBytes);
          page.drawImage(embeddedImg, { x: 0, y: 0, width: pageW, height: pageH });
          hasImageCover = true;
        }
      } catch (e) {}

      if (!hasImageCover) {
        page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: darkCharcoal });
        page.drawRectangle({ x: 0, y: pageH - 20, width: pageW, height: 20, color: emeraldGreen });
        page.drawText("MONEY FARMING", { x: (pageW - fontB.widthOfTextAtSize("MONEY FARMING", 44)) / 2, y: pageH - 220, size: 44, font: fontB, color: rgb(1, 1, 1) });
        const sub = "The 7 Principles for Planting, Growing, and Harvesting Wealth";
        page.drawText(sub, { x: (pageW - fontIt.widthOfTextAtSize(sub, 13)) / 2, y: pageH - 270, size: 13, font: fontIt, color: emeraldGreen });
        page.drawText("ZEKI UBOR", { x: (pageW - fontB.widthOfTextAtSize("ZEKI UBOR", 22)) / 2, y: 120, size: 22, font: fontB, color: rgb(1, 1, 1) });
      }
      continue;
    }

    addHeaderFooter(page, pageTitle, pageNum);

    let y = pageH - 80;
    const marginX = 60;
    const maxWidth = pageW - 120;
    const lineHeight = 15;
    const fontSize = 10;

    const sanitized = cleanText(pageText);
    const lines = sanitized.split('\n');

    for (let rawLine of lines) {
      const lineText = rawLine.trim();
      if (lineText === '') {
        y -= 8;
        continue;
      }

      const isHeader = (lineText.length < 55 && !lineText.endsWith('.') && !lineText.endsWith(',')) || 
                        lineText.startsWith('Chapter') || 
                        lineText.startsWith('CHAPTER') || 
                        lineText.startsWith('Seed') || 
                        lineText.startsWith('Weed') || 
                        lineText.startsWith('Water') || 
                        lineText.startsWith('Money Farming Principle') || 
                        lineText.startsWith('WORKBOOK') || 
                        lineText.startsWith('Reflection Questions') ||
                        lineText.startsWith('DEDICATION') ||
                        lineText.startsWith('TABLE OF CONTENTS') ||
                        lineText.startsWith('INTRODUCTION') ||
                        lineText.startsWith('CONCLUSION') ||
                        lineText.startsWith('FINAL') ||
                        lineText.startsWith('ABOUT THE AUTHOR');

      const font = isHeader ? fontB : fontR;
      const size = isHeader ? 11 : fontSize;
      const color = isHeader ? emeraldGreen : textDark;

      const words = lineText.split(' ');
      let currentLine = '';

      for (let wIdx = 0; wIdx < words.length; wIdx++) {
        const testLine = currentLine + words[wIdx] + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth && wIdx > 0) {
          if (y > 60) {
            page.drawText(currentLine.trim(), { x: marginX, y, size, font, color });
            y -= lineHeight;
          }
          currentLine = words[wIdx] + ' ';
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine.trim().length > 0 && y > 60) {
        page.drawText(currentLine.trim(), { x: marginX, y, size, font, color });
        y -= lineHeight;
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log(`✅ "Money Farming" PDF successfully generated (${pdfDoc.getPageCount()} pages) at: ${targetPath}`);
}

generateMoneyFarmingPDF().catch(err => console.error(err));
