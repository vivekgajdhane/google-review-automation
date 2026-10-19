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

  // English generator
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

    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const opening = pickRandom(openings);
    const middleParts = highlights
      .map(h => {
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

    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const opening = pickRandom(openings);
    const middleParts = highlights
      .map(h => {
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

    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const opening = pickRandom(openings);
    const middleParts = highlights
      .map(h => {
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

  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const opening = pickRandom(openings);
  const middleParts = highlights
    .map(h => {
      const options = highlightMap[h];
      return options ? pickRandom(options) : "";
    })
    .filter(Boolean)
    .slice(0, 3);

  const conclusion = pickRandom(conclusions);
  return `${opening} ${middleParts.join(" ")} ${conclusion}`.replace(/\s+/g, " ").trim();
}
