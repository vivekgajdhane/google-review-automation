export type ReviewLanguage = "en" | "hinglish" | "hi" | "mr";

export interface ReviewGenerationParams {
  businessName: string;
  course?: string;
  highlights: string[];
  language: ReviewLanguage;
  vibe?: "enthusiastic" | "professional" | "concise";
  artist?: string;
  sentiment?: "good" | "not_good";
}

export function generateReviewDraft(params: ReviewGenerationParams): string {
  const { businessName, course, highlights, language, artist, sentiment } = params;
  const isTattoo =
    businessName.toLowerCase().includes("tattoo") ||
    (course && /tattoo|piercing|mandala|realism|ink/i.test(course)) ||
    highlights.some((h) => /sterile|line|artist|peaceful|hygiene|ink/i.test(h));

  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const isMusicStudio =
    businessName.toLowerCase().includes("naad") ||
    businessName.toLowerCase().includes("jam") ||
    (course && /jam|rehearsal|recording|vocal|mixing|mastering|track|studio|podcast/i.test(course)) ||
    highlights.some((h) => /acoustic|drum|amp|soundproof|monitor|lighting|musician|rehearsal/i.test(h));

  // =========================================================================
  // 0. MUSIC JAM ROOM & RECORDING STUDIO NICHE (Naad Jamroom Kharadi Pune)
  // =========================================================================
  if (isMusicStudio) {
    if (language === "en") {
      const openings = [
        `Had an incredible session for ${course || "band rehearsal"} at ${businessName} in Kharadi!`,
        `Hands down one of the best and most comfortable jam rooms and recording studios in Pune!`,
        `Booked ${businessName} for our music session and the entire experience was outstanding.`,
        `Such a creative, positive vibe at ${businessName}! The space is truly built by musicians for musicians.`,
        `Our band rehearsed at ${businessName} and we were thoroughly impressed by the acoustics and backline.`
      ];

      const highlightMap: Record<string, string[]> = {
        "Superb Acoustics & Soundproofing": [
          "The acoustic treatment and sound isolation are top-tier with zero muddy resonance or harsh echoes.",
          "Incredible sound isolation—every instrument and vocal harmony came through crisp and well-defined."
        ],
        "Top-Tier Drum Kit & Tube Amps": [
          "The drum kit is tuned to perfection and the guitar/bass amps deliver rich, punchy tone.",
          "High quality backline gear, tight drum heads, and dependable amplifiers that handle heavy riffs with ease."
        ],
        "Helpful & Musician-Friendly Host": [
          "The host is super supportive, friendly, and helped us dial in our monitors and levels effortlessly.",
          "Warm and welcoming management that genuinely respects musicians and ensures a smooth session."
        ],
        "Cozy Mood Lighting & Vibe": [
          "The ambient studio lighting and aesthetic setup create the perfect creative mood for long sessions.",
          "Great vibe and cozy lighting that kept the whole band energized and in the groove."
        ],
        "Crystal Clear Vocal Monitors": [
          "Vocal monitors and PA mics are crystal clear with zero feedback or audio clipping.",
          "Powerful, clean PA setup so vocalists never have to strain to hear themselves over loud drums."
        ],
        "Affordable Hourly Jamming Rates": [
          "Very pocket-friendly hourly jamming rates offering unbeatable value in Kharadi.",
          "Affordable pricing with zero compromise on professional sound quality and gear."
        ],
        "Clean & Fully Air-Conditioned": [
          "The studio is clean, well-maintained, and the AC cooling keeps high-energy jams super comfortable.",
          "Spacious, chilled, and air-conditioned room with ample room for full bands."
        ]
      };

      const conclusions = [
        "Definitely making this our regular rehearsal pad! 10/10 recommendation.",
        "Must-visit studio for all Pune bands, solo artists, and vocalists!",
        `Can't wait to book our next jamming slot at ${businessName}. Highly recommended!`,
        "Five stars all the way for quality sound, great gear, and pure musical vibes!"
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
      const openings = [
        `${businessName} Kharadi me ${course || "jamming"} session kiya aur sound setup sach me ekdum next level hai!`,
        `Pune me rehearsal aur recording ke liye ${businessName} sabse best aur chill studio hai.`,
        `Humari band ne ${businessName} me practice kiya, sound balance aur energy zabardast mili!`,
        `${businessName} me session attend karne ka experience superb raha, gear aur ambiance dono top class.`
      ];

      const highlightMap: Record<string, string[]> = {
        "Superb Acoustics & Soundproofing": [
          "Acoustic treatment aur soundproofing itni solid hai ki koi harsh echo nahi aata.",
          "Room acoustics ekdum clean hai, har instrument ka sound clear sunai deta hai."
        ],
        "Top-Tier Drum Kit & Tube Amps": [
          "Drum kit well-maintained aur tuned hai, aur amps ka punch aur tone behad solid hai.",
          "Guitars aur bass ke liye heavy-duty amps available hain jo live feel dete hain."
        ],
        "Helpful & Musician-Friendly Host": [
          "Host bhaiya bohot cooperative aur friendly hain, sound check me poori madad ki.",
          "Super polite aur helpful staff jo musicians ki zaroorat ko achhi tarah samajhte hain."
        ],
        "Cozy Mood Lighting & Vibe": [
          "Studio ki aesthetic lighting aur chill vibe se band ka mood automatically ban jata hai.",
          "Ambiance aur lighting ekdum cozy hai, jam karte waqt pata hi nahi chalta time kaise nikla."
        ],
        "Crystal Clear Vocal Monitors": [
          "Vocal mics aur monitors bohot clear hain, loud playing me bhi aawaz dabti nahi.",
          "Zero feedback aur crystal clear sound delivery."
        ],
        "Affordable Hourly Jamming Rates": [
          "Rates bohot genuine aur pocket-friendly hain, Kharadi me itna achha setup rare hai.",
          "Affordable pricing me itne high quality equipments milna kamaal hai."
        ],
        "Clean & Fully Air-Conditioned": [
          "Room clean aur fully air-conditioned hai, long sessions ke liye perfect comfort.",
          "Proper AC cooling aur clean room jo lambi practice ke liye zaroori hai."
        ]
      };

      const conclusions = [
        "Pune ke sabhi musicians aur bands ko definitely recommend karunga!",
        "Next jam ke liye humara spot fix hai! 5 out of 5 stars.",
        "Totally worth it, full musical vibe!",
        "Kharadi aur Viman Nagar side best jam room, highly recommended!"
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

    if (language === "mr") {
      const openings = [
        `नाद जॅमरूम आणि स्टुडिओमध्ये (Kharadi) आमच्या बँडची प्रॅक्टिस केली, अनुभव अतिशय उत्कृष्ट आणि सुखद होता!`,
        `पुण्यातील सर्वोत्तम आणि दर्जेदार जॅमरूम म्हणजे नाद स्टुडिओ! संगीतकारांसाठी परिपूर्ण जागा.`,
        `नाद जॅमरूममध्ये ${course || "संगीताचा सराव"} केला, तिथलं वातावरण आणि ध्वनी संयोजन मनाला खूप भावलं.`
      ];

      const highlightMap: Record<string, string[]> = {
        "Superb Acoustics & Soundproofing": [
          "स्टुडिओचे ॲकॉस्टिक्स आणि साउंडप्रूफिंग उत्तम दर्जाचे असून आवाज अतिशय स्पष्ट येतो.",
          "ध्वनिप्रदूषण विरहित आणि सुसज्ज अशी साऊंडप्रूफ रचना आहे."
        ],
        "Top-Tier Drum Kit & Tube Amps": [
          "ड्रम किट आणि गिटार ॲम्प्लिफायरची गुणवत्ता अतिशय उत्तम आहे.",
          "सर्व वाद्ये आणि इक्विपमेंट्स योग्य प्रकारे मेंटेन केलेली आहेत."
        ],
        "Helpful & Musician-Friendly Host": [
          "स्टुडिओचे संचालक खूप नम्र, मदतनीस आणि सहकार्यशील आहेत.",
          "कलाकारांना समजून घेणारे आणि लगेच सहकार्य करणारे व्यवस्थापन."
        ],
        "Cozy Mood Lighting & Vibe": [
          "स्टुडिओमधील प्रसन्न वातावरण आणि सुंदर लाइटिंग संगीताच्या सरावाला वेगळीच ऊर्जा देतात.",
          "अतिशय शांत, सुरेल आणि सकारात्मक माहोल आहे."
        ],
        "Crystal Clear Vocal Monitors": [
          "मायक्रोफोन आणि व्होकल मॉनिटर्सचा आवाज अतिशय सुस्पष्ट आहे.",
          "गाताना कसलाही त्रास न होता आवाजाची उत्तम स्पष्टता मिळते."
        ],
        "Affordable Hourly Jamming Rates": [
          "पुण्यातील इतर ठिकाणांच्या तुलनेत दर अतिशय वाजवी आणि परवडणारे आहेत.",
          "खराडी परिसरातील उत्तम आणि माफक दरात उपलब्ध जॅमरूम."
        ],
        "Clean & Fully Air-Conditioned": [
          "वातानुकूलित (AC) आणि स्वच्छ जागा असल्याने तासनतास सराव करणे सोपे जाते.",
          "स्वच्छता आणि उत्तम वातानुकूलन."
        ]
      };

      const conclusions = [
        "पुण्यातील सर्व गायक, वादक आणि बँड्सनी नाद जॅमरूमला नक्की भेट द्यावी! ५/५ स्टार्स.",
        "आमच्या पुढील सर्व प्रॅक्टिससाठी नाद स्टुडिओच पहिली पसंती असेल. मनापासून धन्यवाद!",
        "उत्कृष्ट दर्जा आणि सुंदर सांगीतिक अनुभव! मनःपूर्वक शिफारस."
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
      const openings = [
        `नाद जैमरूम एंड स्टूडियो (खराडी, पुणे) में हमारी रिहर्सल का अनुभव बहुत ही शानदार और प्रेरणादायक रहा!`,
        `पुणे में संगीतकारों और बैंड्स के लिए नाद जैमरूम एक बेहतरीन, आधुनिक और सुकून देने वाला स्टूडियो है।`,
        `नाद जैमरूम में ${course || "म्यूजिक प्रैक्टिस"} की, साउंड सेटअप और सुविधाएँ बहुत ही उच्च स्तर की हैं।`
      ];

      const highlightMap: Record<string, string[]> = {
        "Superb Acoustics & Soundproofing": [
          "स्टूडियो की एकॉस्टिक्स और साउंडप्रूफिंग बेहतरीन है, जिससे हर सुर साफ सुनाई देता है।",
          "साउंड बैलेंस इतना सटीक है कि किसी भी इंस्ट्रूमेंट का इको नहीं आता।"
        ],
        "Top-Tier Drum Kit & Tube Amps": [
          "ड्रम किट और गिटार एम्प्स बहुत अच्छी कंडीशन में हैं और जबरदस्त टोन देते हैं।",
          "क्वालिटी बैकलाइन गियर्स जो लाइव प्लेइंग का पूरा मजा देते हैं।"
        ],
        "Helpful & Musician-Friendly Host": [
          "स्टूडियो ओनर बेहद सहयोगी, मिलनसार और मददगार हैं।",
          "म्यूजिशियंस की जरूरतों को समझकर तुरंत सहयोग करने वाला बेहतरीन मैनेजमेंट।"
        ],
        "Cozy Mood Lighting & Vibe": [
          "स्टूडियो की लाइटिंग और एम्बियंस से बहुत ही सुकून भरी और पॉजिटिव वाइब मिलती है।",
          "एकदम शांत और म्यूजिकल माहौल।"
        ],
        "Crystal Clear Vocal Monitors": [
          "वोकल माइक्रोफोन और मॉनिटर्स बेहद स्पष्ट हैं, बिना किसी फीडबैक के।",
          "गायन के दौरान आवाज बिल्कुल क्रिस्टल क्लियर सुनाई देती है।"
        ],
        "Affordable Hourly Jamming Rates": [
          "किफायती और वाजिब घंटे की दरें, खराडी में इससे बेहतर विकल्प मिलना मुश्किल है।",
          "कम खर्च में प्रोफेशनल स्टूडियो का अनुभव।"
        ],
        "Clean & Fully Air-Conditioned": [
          "स्टूडियो बहुत साफ-सुथरा और पूरी तरह एयर-कंडीशन्ड है।",
          "फुल एसी और कम्फर्टेबल सिटिंग स्पेस।"
        ]
      };

      const conclusions = [
        "पुणे के सभी सिंगर्स और बैंड्स को नाद जैमरूम जरूर आजमाना चाहिए! 10/10 रेटिंग।",
        "आगे की सभी रिहर्सल्स के लिए हम यहीं आएंगे। बेहद अनुशंसित!",
        "शानदार साउंड और बेहतरीन अनुभव के लिए 5 स्टार्स!"
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
  }

  // =========================================================================
  // 1. TATTOO STUDIO NICHE GENERATOR (Bhikshu Tattoo & Zen/Peace Ink Experience)
  // =========================================================================
  if (isTattoo) {
    if (language === "en") {
      if (sentiment === "not_good") {
        const notGoodOpenings = (artist && artist !== "ALL")
          ? [
              `Visited ${businessName} in Viman Nagar for a tattoo session with ${artist}.`,
              `Had my ${course || "tattoo"} sitting with ${artist} at ${businessName}.`,
              `Got inked by ${artist} at ${businessName} recently.`
            ]
          : [
              `Visited ${businessName} in Viman Nagar for a ${course || "tattoo"} session.`,
              `Had my inking session at ${businessName} recently.`,
              `Booked a ${course || "tattoo"} appointment at ${businessName}.`
            ];

        const notGoodObservations = [
          "While the studio is hygienic and the artwork turned out okay, the waiting time was quite long even with prior appointment.",
          "The hygiene protocols and sterile setup are maintained well, but the consultation felt rushed and communication regarding pricing could have been much clearer upfront.",
          "The studio ambience is clean, but appointment scheduling felt disorganized and the session took much longer than initially quoted.",
          "The basic artwork turned out decent, but there was minimal guidance on aftercare and the artist seemed in a hurry during the sitting."
        ];

        const notGoodConclusions = [
          "Decent tattoo work overall, but room for improvement in time management and customer coordination.",
          "An average experience. Hope they focus more on client communication and smoother scheduling in the future.",
          "Fair artwork, but expected better customer service and attentiveness for the price charged."
        ];

        const op = pickRandom(notGoodOpenings);
        const obs = pickRandom(notGoodObservations);
        const con = pickRandom(notGoodConclusions);
        return `${op} ${obs} ${con}`.replace(/\s+/g, " ").trim();
      }

      const openings = (artist && artist !== "ALL")
        ? [
            `Got my ${course || "custom tattoo"} done by ${artist} at ${businessName} and the experience was truly exceptional!`,
            `Huge shoutout to ${artist} at ${businessName} in Viman Nagar! The line work and attention to detail are next-level.`,
            `Had a wonderful inking session with ${artist} at ${businessName}—peace of mind, precision, and incredible art.`,
            `${artist} at ${businessName} took the time to understand my vision and turned it into a breathtaking piece of art.`
          ]
        : [
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
      if (sentiment === "not_good") {
        const notGoodOpenings = (artist && artist !== "ALL")
          ? [
              `${businessName} me ${artist} ke saath tattoo session ka experience average raha.`,
              `${businessName} Viman Nagar me ${artist} se tattoo karwaya tha.`
            ]
          : [
              `${businessName} Viman Nagar me tattoo session ka overall experience average raha.`,
              `${businessName} me ${course || "tattoo"} session attend kiya.`
            ];

        const notGoodObservations = [
          "Studio me cleanliness aur hygiene theek thi, lekin appointment ke baad bhi kaafi der wait karna pada aur consultation rushed laga.",
          "Tattoo ka output theek aaya hai par pricing upfront transparent nahi thi aur process ke dauran communication thoda better ho sakta tha.",
          "Clean studio setup hai lekin appointment scheduling me delay hua aur aftercare guidance kaafi basic aur hurried laga."
        ];

        const notGoodConclusions = [
          "Artwork theek hai par time management aur customer handling me improvement ki zaroorat hai.",
          "Average service, future me better coordination aur customer focus expect karte hain.",
          "Tattoo decent bana hai lekin overall experience aur smoother ho sakta tha."
        ];

        const op = pickRandom(notGoodOpenings);
        const obs = pickRandom(notGoodObservations);
        const con = pickRandom(notGoodConclusions);
        return `${op} ${obs} ${con}`.replace(/\s+/g, " ").trim();
      }

      const courseText = course ? `${course} ke liye ` : "";
      const openings = (artist && artist !== "ALL")
        ? [
            `${businessName} me ${artist} sir se apna tattoo karwaya, experience sach me shandar aur peaceful raha!`,
            `Huge shoutout to ${artist} at ${businessName}! Detailing aur fine line work bilkul flawless kiya hai.`,
            `Maine ${businessName} me ${artist} se custom tattoo banwaya aur finishing ekdum top-class aayi hai.`
          ]
        : [
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
      if (sentiment === "not_good") {
        const notGoodOpenings = (artist && artist !== "ALL")
          ? [
              `${businessName} विमान नगर में आर्टिस्ट ${artist} से टैटू बनवाया।`,
              `${businessName} में ${artist} के साथ टैटू सेशन का अनुभव औसत रहा।`
            ]
          : [
              `${businessName} विमान नगर में टैटू बनवाने का मेरा अनुभव सामान्य रहा।`,
              `${businessName} में ${course || "टैटू"} सेशन के लिए गया था।`
            ];

        const notGoodObservations = [
          "स्टूडियो की स्वच्छता और हाइजीन ठीक है, परंतु अपॉइंटमेंट होने के बावजूद काफी लंबा इंतजार करना पड़ा और कंसल्टेशन थोड़ा जल्दबाजी में लगा।",
          "टैटू का काम ठीक हुआ है, लेकिन प्रक्रिया के दौरान मार्गदर्शन और आफ्टरकेयर की जानकारी उतनी स्पष्ट नहीं दी गई जितनी उम्मीद थी।",
          "साफ-सफाई का ध्यान रखा गया है, लेकिन समय प्रबंधन और शुरुआत में शुल्क को लेकर स्पष्टता में कमी महसूस हुई।"
        ];

        const notGoodConclusions = [
          "टैटू ठीक बना है, लेकिन समय प्रबंधन और ग्राहक सेवा में सुधार की आवश्यकता है।",
          "एक सामान्य अनुभव रहा, भविष्य में बेहतर समन्वय और संवाद की उम्मीद है।",
          "कलाकारी ठीक है परंतु कुल मिलाकर अनुभव और बेहतर हो सकता था।"
        ];

        const op = pickRandom(notGoodOpenings);
        const obs = pickRandom(notGoodObservations);
        const con = pickRandom(notGoodConclusions);
        return `${op} ${obs} ${con}`.replace(/\s+/g, " ").trim();
      }

      const courseText = course ? `${course} के लिए ` : "";
      const openings = (artist && artist !== "ALL")
        ? [
            `${businessName} में ${artist} जी से टैटू बनवाया और अनुभव वाकई अद्भुत और शांतिपूर्ण रहा।`,
            `${businessName} के आर्टिस्ट ${artist} का काम और रेखाओं की बारीकी बेहद प्रशंसनीय है।`
          ]
        : [
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
