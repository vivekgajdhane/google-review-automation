export type ReviewLanguage = "en" | "hinglish" | "hi" | "mr";

export interface ReviewGenerationParams {
  businessName: string;
  course?: string;
  highlights: string[];
  language: ReviewLanguage;
  vibe?: "enthusiastic" | "professional" | "concise";
}

export function generateReviewDraft(params: ReviewGenerationParams): string {
  const { businessName, course, highlights, language } = params;
  const isTattoo =
    businessName.toLowerCase().includes("tattoo") ||
    (course && /tattoo|piercing|mandala|realism|ink/i.test(course)) ||
    highlights.some((h) => /sterile|line|artist|peaceful|hygiene|ink/i.test(h));

  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // =========================================================================
  // 1. TATTOO STUDIO NICHE GENERATOR (Bhikshu Tattoo & Zen/Peace Ink Experience)
  // =========================================================================
  if (isTattoo) {
    if (language === "en") {
      const openings = [
        `Got my ${course || "custom tattoo"} done at ${businessName} and the experience was truly exceptional!`,
        `Such a peaceful, welcoming vibe at ${businessName}! Truly one of the finest tattoo studios in Pune.`,
        `I got inked at ${businessName} in Viman Nagar and couldn't be happier with how my tattoo turned out.`,
        `If you are looking for meaningful art and a peaceful, sterile session, ${businessName} is the absolute best.`,
        `Had a wonderful inking experience at ${businessName}—peace of mind, precision, and incredible art.`
      ];

      const highlightMap: Record<string, string[]> = {
        "100% Sterile & Hygiene First": [
          "The studio follows strict sterilization protocols with fresh single-use needles unsealed right in front of you.",
          "Extremely clean and hygienic setup which gave me complete confidence and peace of mind."
        ],
        "Incredibly Fine Lines": [
          "The line work and detailing are super sharp, neat, and extraordinarily precise.",
          "Masterful execution on fine lines and shading—the finished art looks stunning and healed beautifully."
        ],
        "Peaceful Studio Ambience": [
          "The studio has a calm, meditative energy that makes the entire inking process gentle and relaxing.",
          "A serene sanctuary with soothing vibes where you can truly connect your story to your tattoo."
        ],
        "Patient & Gentle Artists": [
          "The artists are so patient, gentle, and ensure you remain completely comfortable throughout the session.",
          "They checked in on my comfort regularly and made the whole sitting virtually painless."
        ],
        "Meaningful Custom Design": [
          "They took time to understand my story and created a personalized custom sketch tailored exactly to what I imagined.",
          "Patient consultation where my rough concept was transformed into a deeply meaningful piece of art."
        ],
        "Clear Aftercare Guidance": [
          "Provided clear instructions and healing guidance for smooth, hassle-free aftercare.",
          "Detailed post-tattoo care advice ensured my tattoo healed with vibrant, crisp color retention."
        ],
        "Transparent Pricing": [
          "Fair, upfront pricing with no hidden charges for such world-class quality craftsmanship.",
          "Complete transparency in consultation and pricing—truly honest artists."
        ]
      };

      const conclusions = [
        "Already planning my next piece with them! 10/10 recommendation.",
        "Best tattoo studio in Viman Nagar and Pune. Highly recommended!",
        "Huge respect to the team at " + businessName + " for such wonderful artistry and peace.",
        "Worth every rupee. Truly connects your story to your ink!"
      ];

      const opening = pickRandom(openings);
      const middleParts = highlights
        .map((h) => {
          const options = highlightMap[h];
          return options ? pickRandom(options) : "";
        })
        .filter(Boolean)
        .slice(0, 3);
      const conclusion = pickRandom(conclusions);
      return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
    }

    if (language === "hinglish") {
      const courseText = course ? `${course} ke liye ` : "";
      const openings = [
        `${businessName} me mera tattoo session sach me bahut peaceful aur shandar raha!`,
        `Maine ${courseText}${businessName} select kiya aur ye mera ab tak ka sabse best tattoo experience tha.`,
        `Viman Nagar me custom tattoo banwane ke liye ${businessName} se behtar studio koi nahi hai.`,
        `Bahut hi calm, peaceful aur hygienic studio hai, tattoo finishing aur vibe dono top-class hain.`
      ];

      const highlightMap: Record<string, string[]> = {
        "100% Sterile & Hygiene First": [
          "Hygiene ka 100% dhyan rakha jata hai, fresh sterile needles mere samne open kiye gaye.",
          "Studio ekdum clean aur hygienic hai, safely tattoo banwane ke liye best place."
        ],
        "Incredibly Fine Lines": [
          "Fine lines aur shading work itna clean hai ki tattoo ka look ekdum lifelike lag raha hai.",
          "Detailing aur finishing lajawab hai, har ek line bilkul sharp aur neat aayi hai."
        ],
        "Peaceful Studio Ambience": [
          "Studio ka vibe bohot shant aur positive hai, tattoo banwate waqt bilkul anxiety ya dar nahi laga.",
          "Ekdum calm aur relaxing environment hai, aaram se poora session complete hua."
        ],
        "Patient & Gentle Artists": [
          "Artists ka nature bohot humble aur patient hai, pain ka poora dhyan rakhte hain.",
          "Artist ne bohot gently handle kiya aur baar-baar comfort check kiya."
        ],
        "Meaningful Custom Design": [
          "Meri thought aur story ko patiently sunke ekdum personalized design sketch kiya.",
          "Mere concept ko itni sundar custom art me convert kiya jo mere dil ke behad kareeb hai."
        ],
        "Clear Aftercare Guidance": [
          "Tattoo healing aur aftercare ke baare me sab kuch step-by-step samjhaya.",
          "Proper aftercare routine batayi jisse tattoo bilkul smoothly heal ho gaya."
        ],
        "Transparent Pricing": [
          "Pricing bilkul fair aur transparent hai, world-class quality ke samne poora value for money hai.",
          "No hidden charges, honest consultation aur genuine pricing mila."
        ]
      };

      const conclusions = [
        "Pune me tattoo lovers ko yaha zaroor aana chahiye! Highly recommended.",
        "Thank you " + businessName + " team for this beautiful ink! 5 stars!",
        "Next tattoo bhi pakka yahi se banwaunga. Fantastic experience!",
        "100% satisfied with the artwork. Keep it up!"
      ];

      const opening = pickRandom(openings);
      const middleParts = highlights
        .map((h) => {
          const options = highlightMap[h];
          return options ? pickRandom(options) : "";
        })
        .filter(Boolean)
        .slice(0, 3);
      const conclusion = pickRandom(conclusions);
      return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
    }

    if (language === "hi") {
      const courseText = course ? `${course} के लिए ` : "";
      const openings = [
        `${businessName} में टैटू बनवाने का मेरा अनुभव अत्यंत शांत, सुखद और यादगार रहा।`,
        `विमान नगर, पुणे में अर्थपूर्ण और उत्तम कलाकारी के लिए ${businessName} सबसे बेहतरीन टैटू स्टूडियो है।`,
        `मैंने ${courseText}${businessName} में टैटू बनवाया और इसकी फिनिशिंग देखकर मन प्रसन्न हो गया।`
      ];

      const highlightMap: Record<string, string[]> = {
        "100% Sterile & Hygiene First": [
          "यहाँ स्वच्छता और स्वच्छता के नियमों का शत-प्रतिशत पालन किया जाता है, नई सुइयां सामने खोली जाती हैं।",
          "स्टूडियो अत्यंत साफ-सुथरा और सुरक्षित है, जिससे पूरा भरोसा मिलता है।"
        ],
        "Incredibly Fine Lines": [
          "बारीक रेखाओं और शेडिंग का काम बहुत ही सटीक और शानदार तरीके से किया गया है।",
          "टैटू की डिटेलिंग बहुत ही खूबसूरत और जीवंत दिखती है।"
        ],
        "Peaceful Studio Ambience": [
          "स्टूडियो का वातावरण बहुत ही शांत, सकारात्मक और ध्यानमग्न है।",
          "यहाँ का शांत माहौल टैटू बनवाते समय मन को पूरी तरह सुकून देता है।"
        ],
        "Patient & Gentle Artists": [
          "यहाँ के कलाकार अत्यंत धैर्यवान, विनम्र और अपने काम में निपुण हैं।",
          "उन्होंने पूरी प्रक्रिया के दौरान आराम का पूरा ध्यान रखा और दर्द बिल्कुल महसूस नहीं होने दिया।"
        ],
        "Meaningful Custom Design": [
          "उन्होंने मेरी भावना को समझकर एक बहुत ही सुंदर और अनूठा कस्टम डिजाइन तैयार किया।",
          "विचारों को इतनी सुंदर कला में ढालने के लिए विशेष धन्यवाद।"
        ],
        "Clear Aftercare Guidance": [
          "टैटू की देखभाल और हीलिंग के लिए बहुत ही स्पष्ट और उपयोगी निर्देश दिए गए।",
          "आफ्टरकेयर के सही मार्गदर्शन से टैटू बहुत अच्छे से ठीक हो गया।"
        ],
        "Transparent Pricing": [
          "काम की उच्च गुणवत्ता को देखते हुए शुल्क बिल्कुल उचित और पारदर्शी है।",
          "किसी भी तरह का कोई छिपा हुआ शुल्क नहीं है।"
        ]
      };

      const conclusions = [
        "पुणे के सभी टैटू प्रेमियों के लिए यह स्टूडियो अत्यधिक अनुशंसित है!",
        "इस खूबसूरत कला के लिए पूरी टीम का हार्दिक धन्यवाद।",
        "५ में से ५ स्टार! अद्भुत अनुभव।"
      ];

      const opening = pickRandom(openings);
      const middleParts = highlights
        .map((h) => {
          const options = highlightMap[h];
          return options ? pickRandom(options) : "";
        })
        .filter(Boolean)
        .slice(0, 3);
      const conclusion = pickRandom(conclusions);
      return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
    }

    // Marathi for Bhikshu Tattoo (Local Pune / Viman Nagar vibe)
    const courseText = course ? `${course} साठी ` : "";
    const openings = [
      `${businessName} मध्ये टॅटू काढण्याचा माझा अनुभव अत्यंत शांत, सुखद आणि समाधानकारक होता!`,
      `विमान नगर, पुणे मधील सर्वोत्कृष्ट आणि अत्यंत हायजिनिक टॅटू स्टुडिओ म्हणजे ${businessName}.`,
      `मी ${courseText}${businessName} ची निवड केली, आणि टॅटूची फिनिशिंग खरोखर अप्रतिम आली आहे.`
    ];

    const highlightMap: Record<string, string[]> = {
      "100% Sterile & Hygiene First": [
        "येथे हायजिन आणि स्वच्छतेची १००% काळजी घेतली जाते, नवीन स्टेरिलाईज्ड सुया समोरच उघडल्या जातात.",
        "अत्यंत स्वच्छ आणि सुरक्षित वातावरण असल्यामुळे पूर्ण विश्वास बसतो."
      ],
      "Incredibly Fine Lines": [
        "फाईन लाईन्स आणि शेडिंगचे काम अतिशय बारकाईने आणि सुबक केले आहे.",
        "डिटेलिंग इतकी छान आहे की टॅटू अत्यंत देखणा आणि उठावदार दिसतो."
      ],
      "Peaceful Studio Ambience": [
        "स्टुडिओमधील वातावरण अतिशय शांत, प्रसन्न आणि पॉझिटिव्ह आहे.",
        "अगदी शांत वातावरणात कुठलाही ताण न घेता टॅटू सेशन पूर्ण झाले."
      ],
      "Patient & Gentle Artists": [
        "आर्टिस्ट खूप नम्र, संयमी आणि अनुभवी आहेत, त्रास होणार नाही याची पूर्ण काळजी घेतात.",
        "अगदी हळुवारपणे आणि व्यवस्थित लक्ष देऊन त्यांनी टॅटू पूर्ण केला."
      ],
      "Meaningful Custom Design": [
        "माझा विचार आणि कल्पना समजून घेऊन एक सुंदर कस्टम डिझाइन तयार करून दिले.",
        "माझ्या संकल्पनेला त्यांनी एका सुरेख कलेचे रूप दिले."
      ],
      "Clear Aftercare Guidance": [
        "टॅटू नंतर त्वचेची कशी काळजी घ्यावी याबद्दल सविस्तर आणि योग्य मार्गदर्शन मिळाले.",
        "आफ्टरकेअरच्या योग्य सल्ल्यामुळे टॅटू खूप छान आणि लवकर बरा झाला."
      ],
      "Transparent Pricing": [
        "अशा उत्कृष्ट दर्ज्याच्या कामासाठी फी एकदम योग्य आणि पारदर्शक आहे.",
        "कोणतेही छुपे चार्जेस नाहीत, अतिशय प्रामाणिक सल्ला मिळतो."
      ]
    };

    const conclusions = [
      "पुण्यातील प्रत्येकाने स्वतःचा टॅटू बनवण्यासाठी नक्की भेट द्यावी!",
      "सर्व टीमचे आणि कलाकारांचे मनःपूर्वक आभार! ५ पैकी ५ स्टार.",
      "पुढचा टॅटू सुद्धा नक्की येथूनच काढणार!"
    ];

    const opening = pickRandom(openings);
    const middleParts = highlights
      .map((h) => {
        const options = highlightMap[h];
        return options ? pickRandom(options) : "";
      })
      .filter(Boolean)
      .slice(0, 3);
    const conclusion = pickRandom(conclusions);
    return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
  }

  // =========================================================================
  // 2. EDUCATION / TRAINING INSTITUTE GENERATOR (Phoenix-Tech Academy)
  // =========================================================================
  if (language === "en") {
    const openings = [
      `Had an amazing learning experience at ${businessName}!`,
      `Enrolled for ${course || "training"} at ${businessName} and it was one of the best decisions for my skills.`,
      `I highly recommend ${businessName} for anyone looking for solid practical education in Hadapsar.`,
      `Great institute with genuine focus on student learning and practical skills!`,
      `Really glad I joined ${businessName} for my course.`
    ];

    const highlightMap: Record<string, string[]> = {
      "Expert Faculty & Mentorship": [
        "The trainers are extremely knowledgeable, patient, and always ready to clear doubts.",
        "Faculty members give personal attention to every single student and explain complex topics simply."
      ],
      "Modern Hands-on Lab": [
        "The computer lab is well-equipped with modern systems and high-speed internet.",
        "Great practical lab environment where you get sufficient individual PC practice time."
      ],
      "Practical Real Projects": [
        "Everything taught is project-based and hands-on, not just boring textbook theory.",
        "We worked on real-world practical assignments which boosted my confidence immensely."
      ],
      "Personal Attention": [
        "Unlike other crowded classes, teachers here focus on your individual learning pace.",
        "The personalized guidance helped me grasp all the concepts very clearly."
      ],
      "Flexible Batch Timings": [
        "Batch timings are very convenient and flexible for college students and working people.",
        "They accommodated my preferred schedule without any hassle."
      ],
      "Affordable Fees": [
        "Very reasonable course fees considering the high quality of education and support provided.",
        "Complete value for money with no hidden charges."
      ],
      "Career Guidance": [
        "They provided fantastic career counseling and guidance on resume building.",
        "Helpful career guidance that gives you a clear roadmap for job opportunities."
      ]
    };

    const conclusions = [
      "Must visit if you want to upgrade your computer skills!",
      "10/10 recommendation for students in Pune looking for genuine growth.",
      "Thank you to the entire team at " + businessName + "!",
      "Truly the best training institute in Hadapsar!"
    ];

    const opening = pickRandom(openings);
    const middleParts = highlights
      .map((h) => {
        const options = highlightMap[h];
        return options ? pickRandom(options) : "";
      })
      .filter(Boolean)
      .slice(0, 3);

    const conclusion = pickRandom(conclusions);
    return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
  }

  // Hinglish generator
  if (language === "hinglish") {
    const courseText = course ? `${course} ke liye ` : "";
    const openings = [
      `${businessName} me mera learning experience sach me bahut shandar raha!`,
      `Maine ${businessName} join kiya tha ${courseText}aur ye mera best decision tha.`,
      `Hadapsar me computer aur tech seekhne ke liye ${businessName} no.1 academy hai.`,
      `Bahut hi accha institute hai, teaching style aur environment dono top-notch hain.`
    ];

    const highlightMap: Record<string, string[]> = {
      "Expert Faculty & Mentorship": [
        "Teachers bahut supportive aur friendly hain, sabhi doubts ko step-by-step clear karte hain.",
        "Faculty ka guidance ekdum personal level pe milta hai, koi bhi cheez baar-baar samjha dete hain."
      ],
      "Modern Hands-on Lab": [
        "Computer lab bilkul modern hai aur har student ko proper practical karne ka time milta hai.",
        "Lab facilities kaafi acchi hain, sabhi systems properly maintained hain."
      ],
      "Practical Real Projects": [
        "Theory ke sath sath practical assignments aur real projects pe zyaada focus hota hai.",
        "Hands-on practice ki wajah se mera confidence bahut badh gaya hai."
      ],
      "Personal Attention": [
        "Har student pe personal dhyan diya jata hai, batch me sabhi ko easily samajh aa jata hai.",
        "Yahan sabhi ko barabar attention milti hai jo mujhe sabse acchi baat lagi."
      ],
      "Flexible Batch Timings": [
        "Batch timings bahut flexible hain, student apne convenience ke hisab se select kar sakte hain.",
        "Timing ka koi issue nahi hota, morning aur evening options available hain."
      ],
      "Affordable Fees": [
        "Fees structure bilkul affordable hai aur quality of teaching ke samne poora value for money hai.",
        "Kam fees me itna accha course aur certification milna mushkil hai."
      ],
      "Career Guidance": [
        "Career guidance aur future planning ke liye sir ne bohot help ki.",
        "Placement aur career related guidance bhi kaafi informative mili."
      ]
    };

    const conclusions = [
      "Hadapsar ke sabhi students ko definitely yaha aana chahiye!",
      "Highly recommended to everyone! Thank you " + businessName + " team.",
      "5 stars bina kisi doubt ke. Keep it up!",
      "Mujhe seekhne me bohot maza aaya, thanks a lot!"
    ];

    const opening = pickRandom(openings);
    const middleParts = highlights
      .map((h) => {
        const options = highlightMap[h];
        return options ? pickRandom(options) : "";
      })
      .filter(Boolean)
      .slice(0, 3);

    const conclusion = pickRandom(conclusions);
    return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
  }

  // Hindi generator
  if (language === "hi") {
    const courseText = course ? `${course} के लिए ` : "";
    const openings = [
      `${businessName} में सीखने का मेरा अनुभव अत्यंत सराहनीय रहा।`,
      `हडपसर में कंप्यूटर और तकनीकी शिक्षा के लिए ${businessName} एक उत्कृष्ट संस्थान है।`,
      `मैंने ${courseText}${businessName} में प्रवेश लिया था और यहाँ का प्रशिक्षण बहुत ही बेहतरीन है।`
    ];

    const highlightMap: Record<string, string[]> = {
      "Expert Faculty & Mentorship": [
        "यहाँ के शिक्षक बहुत ही अनुभवी, धैर्यवान और सहयोगी हैं।",
        "अध्यापक हर विषय को बहुत ही सरल और स्पष्ट तरीके से समझाते हैं।"
      ],
      "Modern Hands-on Lab": [
        "कंप्यूटर लैब आधुनिक सुविधाओं से युक्त है और व्यावहारिक अभ्यास के लिए पर्याप्त समय मिलता है।",
        "लैब का वातावरण सीखने के लिए बहुत ही अनुकूल है।"
      ],
      "Practical Real Projects": [
        "किताबी ज्ञान के अलावा वास्तविक प्रोजेक्ट्स पर काम करने का अवसर मिलता है।",
        "प्रैक्टिकल ट्रेनिंग की वजह से आत्मविश्वास बहुत बढ़ा है।"
      ],
      "Personal Attention": [
        "प्रत्येक विद्यार्थी पर व्यक्तिगत ध्यान दिया जाता है जिससे कोई भी संदेह नहीं रहता।",
        "यहाँ सभी छात्रों को समान मार्गदर्शन प्राप्त होता है।"
      ],
      "Flexible Batch Timings": [
        "बैच का समय बहुत ही सुविधाजनक और लचीला है।",
        "समय का चुनाव अपनी सुविधानुसार किया जा सकता है।"
      ],
      "Affordable Fees": [
        "फीस बहुत ही उचित है और शिक्षण की गुणवत्ता के अनुसार यह पूरी तरह सार्थक है।",
        "सुलभ शुल्क में उच्च स्तरीय तकनीकी शिक्षा।"
      ],
      "Career Guidance": [
        "करियर और रोजगार के अवसरों के लिए बहुत अच्छा मार्गदर्शन प्रदान किया जाता है।",
        "आगे के भविष्य के लिए उचित सलाह दी जाती है।"
      ]
    };

    const conclusions = [
      "हडपसर और पुणे के सभी विद्यार्थियों के लिए यह संस्थान अत्यधिक अनुशंसित है!",
      "पूरी टीम का बहुत-बहुत धन्यवाद!",
      "उत्कृष्ट संस्थान और बेहतरीन अनुभव।"
    ];

    const opening = pickRandom(openings);
    const middleParts = highlights
      .map((h) => {
        const options = highlightMap[h];
        return options ? pickRandom(options) : "";
      })
      .filter(Boolean)
      .slice(0, 3);

    const conclusion = pickRandom(conclusions);
    return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
  }

  // Marathi generator (Local language for Pune / Hadapsar)
  const courseText = course ? `${course} साठी ` : "";
  const openings = [
    `${businessName} मध्ये शिकण्याचा माझा अनुभव अत्यंत उत्तम आणि समाधानकारक होता!`,
    `हडपसर मधील कॉम्प्युटर शिक्षणासाठी ${businessName} ही एक नंबर अकॅडमी आहे.`,
    `मी ${courseText}${businessName} मध्ये ॲडमिशन घेतले होते, शिकवण्याची पद्धत खरोखर खूप छान आहे.`
  ];

  const highlightMap: Record<string, string[]> = {
    "Expert Faculty & Mentorship": [
      "येथील सर आणि शिक्षक खूप अनुभवी असून प्रत्येक शंका अगदी सोप्या भाषेत सोडवतात.",
      "शिक्षकांचे वैयक्तिक मार्गदर्शन आणि सहकार्य नेहमी मिळते."
    ],
    "Modern Hands-on Lab": [
      "कॉम्प्युटर लॅब अद्ययावत असून प्रॅक्टिकल करण्यासाठी भरपूर वेळ मिळतो.",
      "लॅब मधील सर्व सिस्टिम्स चांगल्या स्थितीत आहेत."
    ],
    "Practical Real Projects": [
      "फक्त पुस्तकी ज्ञान न देता प्रत्यक्ष प्रॅक्टिकलवर जास्त भर दिला जातो.",
      "प्रोजेक्ट्स आणि असाइनमेंट्स मुळे भरपूर कॉन्फिडन्स वाढला."
    ],
    "Personal Attention": [
      "प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष दिले जाते, ज्यामुळे शिकणे खूप सोपे होते.",
      "शिकवताना कोणालाही अडचण आल्यास लगेच मदत केली जाते."
    ],
    "Flexible Batch Timings": [
      "बॅचच्या वेळा खूप सोयीस्कर आहेत, कॉलेज किंवा नोकरी सांभाळून शिकता येते.",
      "सकाळ आणि संध्याकाळच्या विविध बॅचेस उपलब्ध आहेत."
    ],
    "Affordable Fees": [
      "फी एकदम वाजवी असून दर्जेदार शिक्षणाचा पूर्ण मोबदला मिळतो.",
      "कमी खर्चात उत्कृष्ट कॉम्प्युटर ट्रेनिंग मिळते."
    ],
    "Career Guidance": [
      "करिअर संदर्भात खूप मोलाचे मार्गदर्शन मिळाले.",
      "भविष्यातील संधींबाबत योग्य दिशा दाखवली जाते."
    ]
  };

  const conclusions = [
    "पुणे आणि हडपसर परिसरातील विद्यार्थ्यांनी नक्की भेट द्यावी!",
    "सर्व शिक्षक आणि टीमचे मनःपूर्वक आभार!",
    "५ पैकी ५ स्टार! खूप छान अकॅडमी."
  ];

  const opening = pickRandom(openings);
  const middleParts = highlights
    .map((h) => {
      const options = highlightMap[h];
      return options ? pickRandom(options) : "";
    })
    .filter(Boolean)
    .slice(0, 3);

  const conclusion = pickRandom(conclusions);
  return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
}
