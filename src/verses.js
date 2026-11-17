/* v4 pasurams.
   VERSES2: Tamil text exactly as quoted in each temple's Tamil Wikipedia article (sandhi as given there);
   transliteration generated letter by letter in the app; English renderings are study drafts by Claude.
   SING: where the Azhwars sing each temple, from T. R. S. Iyengar's mangalasasanam table
   (trsiyengar.com) and the commentary tradition. Some single-verse references need checking. */
const VERSES2 = [
 {ns:[2,90], by:'Thirumangai Azhwar', ref:'Periya Thirumozhi 9.2.5',
  ta:'கோழியும் கூடலும் கோயில் கொண்ட\nகோவலரே ஒப்பர் குன்றமன்ன\nபாழியும் தோளும் ஓர் நான்குடையர்\nபண்டு இவர் தம்மையும் கண்டறியோம்\nவாழியரோ இவர் வண்ணமென்னில்\nமாகடல் போன்று உளர் கையில் வெய்ய\nஆழி ஒன்று ஏந்தி ஓர் சங்கு பற்றி\nஅச்சோ ஒருவர் அழகியவா.',
  en:'He has made Kozhi (Uraiyur) and Koodal (Madurai) His temples, and He looks like one of the cowherds. He has four shoulders, broad and strong as hills. We have never seen Him before. Long may He live! If you ask His colour, He is like the great ocean. In His hand He holds a fierce discus, and He carries a conch. Ah, how beautiful this One is!',
  note:'From the Thirunagai decad, sung as a girl struck by the Lord\'s beauty. The refrain "acho oruvar azhagiyavaa" closes every verse.'},
 {ns:[3,89], by:'Thirumangai Azhwar', ref:'Periya Thirumozhi 5.6.2',
  ta:'பேரானை குறுங்குடியெம்\nபெருமானை திருத்தண்கால்\nஊரானை கரம்பனூர் உத்தமனை முத்திலங்கு\nகாரார்திண் கடலேழு மலையேழிவ்வுலகேழுண்டும்\nஆராதென்றிருந்தானை கண்டது தென்னரங்கத்தே',
  en:'He of Per; our Lord of Kurungudi; He whose town is Thiruthangal; the Supreme One of Karambanur; He who swallowed the seven strong dark seas where pearls shine, the seven mountains and these seven worlds, and still sat as if not satisfied: Him I saw in southern Arangam.',
  note:'A single verse that names five Divya Desams and finds them all in Srirangam.'},
 {ns:[5,59], by:'Thirumazhisai Azhwar', ref:'Nanmugan Thiruvandadi 36',
  ta:'நாகத் தணைக்குடந்தை வெஃகா திருவெவ்வுள்,\nநாகத் தணையரங்கம் பேரன்பில், - நாகத்\nதணைப்பாற் கடல்கிடக்கு மாதி நெடுமால்,\nஅணைப்பார் கருத்தனா வான்',
  en:'The first and tall Lord, who lies on the serpent bed at Kudanthai, Vekka and Thiruvevvul, on the serpent bed at Arangam, Per and Anbil, and on the serpent bed in the Milk Ocean, becomes the very object of the minds of those who hold Him close.',
  note:'Eight reclining Lords in one verse. Anbil is named only here, which is why it is a Divya Desam.'},
 {ns:[7], by:'Thirumangai Azhwar', ref:'Thirukkurunthandakam 19',
  ta:'பிண்டியார் மண்டை ஏந்தி\nபிறர் மனை திரிதந்து உண்ணும்\nஉண்டியான் சாபம் தீர்த்த\nஒருவன் ஊர் உலகம் எட்டும்\nகண்டியூர் அரங்கம் மெய்யம்\nகச்சி பேர் மல்லை என்று\nமண்டினார் உய்யல் அல்லால்\nமற்றை யார்க்கு உய்யல் ஆமே.',
  en:'The towns of the One who ended the curse of him who wandered to others\' houses with a skull for a begging bowl, eating what he was given, are Kandiyur, praised by the whole world, Arangam, Meyyam, Kachi, Per and Mallai. Those who throng to them are saved. Can anyone else be saved?',
  note:'The skull is Brahma\'s, stuck to Shiva\'s hand; the Lord of Kandiyur released it.'},
 {ns:[9], by:'Thirumazhisai Azhwar', ref:'Nanmugan Thiruvandadi 50',
  ta:'கூற்றமும் சாரா கொடுவினையும் சாரா\nதீ மாற்றமும் சாரா வகை அறிந்தேன்\nஆற்றங்கரைக் கிடக்கும் கண்ணன் கடல் கிடக்கும்\nமாயன் உரைக் கிடக்கும் உள்ளத்து எனக்கு.',
  en:'Death will not come near, cruel karma will not come near, evil words will not come near: I have learned the way. For in my heart lies the word of Kannan, who lies on the river bank, the wondrous One who lies in the ocean.',
  note:'"The Kannan who lies on the river bank" is understood as the Lord of Kapisthalam on the Kaveri.'},
 {ns:[15], by:'Thirumangai Azhwar', ref:'Periya Thirumozhi 7.4 (Thirucherai decad)',
  ta:'பைவிரியும் வரியரவில் படுகடலுள் துயிலமர்ந்த பண்பா என்றும்\nமைவிரியும் மணிவரைபோல் மாயவனே என்றென்றும்\nவண்டார் நீலம் செய்விரியும் தண்சேறை யெம்பெருமான் திருவடியைச் சிந்தித்தேற்கு\nஎன் ஐயறிவும் கொண்டானுக் காளானார்க் காளாமென் அன்பு தானே.',
  en:'Ever saying "O gracious One, who rests on the striped serpent with spreading hoods in the deep sea", ever saying "O wondrous One, like a sapphire hill spreading darkness", I meditate on the feet of our Lord of cool Cherai, where blue lilies full of bees open in the fields. And so my love now serves those who serve Him who has taken all five of my senses.',
  note:'Love of God ripening into love for His servants: a theme dear to both Sri Vaishnavas and Gaudiyas.'},
 {ns:[20,63], by:'Thirumangai Azhwar', ref:'Periya Thirumozhi 2.5.3',
  ta:'உடம்பு உருவில் மூன்று ஒன்றாய், மூர்த்தி வேறு ஆய்\nஉலகு உய்ய நின்றானை; அன்று பேய்ச்சி\nவிடம் பருகு வித்தகனை; கன்று மேய்த்து\nவிளையாட வல்லானை; வரைமீ கானில்\nதடம் பருகு கரு முகிலைத் தஞ்சைக் கோயில்\nதவ நெறிக்கு ஓர் பெரு நெறியை; வையம் காக்கும்\nகடும் பரிமேல் கற்கியை நான் கண்டுகொண்டேன்\nகடி பொழில் சூழ் கடல்மல்லைத் தலசயனத்தே',
  en:'He who stood for the world\'s salvation, the three in one body and yet distinct in form; the clever One who long ago drank the poison of the demoness; He who loved to play herding calves; the dark cloud that drinks the pools in the forests on the hilltops; the great path for those who walk the way of penance at the Thanjai temple; Kalki on the fierce horse who will protect the earth: Him I have found at Thalasayanam in Kadalmallai, ringed by fragrant groves.',
  note:'The Lord of Thanjai Mamani Koil named within a hymn to Mamallapuram.'},
 {ns:[45,78], by:'Thirumangai Azhwar', ref:'Thirunedunthandakam 14',
  ta:'முளைக்கதிரைக் குறுங்குடியுள் முகிலை மூவா\nமூவுலகும் கடந்தப்பால் முதலாய் நின்ற\nஅளப்பரிய ஆரமுதை அரங்கம் மேய\nஅந்தணனை அந்தணர்தம் சிந்தையானை\nவிளக்கொளியை மரகதத்தைத் திருத்தண்காவில்\nவெஃகாவில் திருமாலைப் பாடக் கேட்டு\nவளர்த்தனால் பயன்பெற்றேன் வருக என்று\nமடக்கிளியைக் கைகூப்பி வணங்கினாளே!',
  en:'Her parrot sang of the rising sun, the rain cloud in Kurungudi, the measureless nectar who stands as the First beyond the three unageing worlds, the pure One who dwells in Arangam and lives in the minds of the pure, the Light and the Emerald at Thiruthanka, and Thirumal at Vekka. Hearing it she said, "I have had the reward for raising you. Come!" and bowed to the young parrot with folded hands.',
  note:'The mother describes her daughter (the Azhwar in a bride\'s mood). "Vilakkoli" names the Lord of Thiruthanka.'},
 {ns:[47,49,50,52,53,54,6], by:'Thirumangai Azhwar', ref:'Thirunedunthandakam 8',
  ta:'நீரகத்தாய் நெடுவரையினுச்சி மேலாய்\nநிலாத்திங்கள் துண்டத்தாய் நிறைந்த கச்சி\nஊரகத்தாய் ஒண்துரை நீர் வெஃகாவுள்ளாய்\nஉள்ளுவா ருள்ளத்தாய் உலகமேத்தும்\nகாரகத்தாய் கார்வானத்துள்ளாய் கள்வா\nகாமருபூங் காவிரியின் தென்பால் மன்னு\nபேரகத்தாய் பேராதென் நெஞ்சினுள்ளாய்\nபெருமானுன் திருவடியே பேணினேனே',
  en:'O You in Neeragam! O You on the summit of the tall hill! O You in Nilathingal Thundam! O You in Ooragam in crowded Kachi! O You in Vekka with its bright bathing ghats! O You in the hearts of those who think of You! O You in Karagam, praised by the world! O You in Karvanam! O Thief (of Kalvanur)! O You who dwell in Peragam on the south bank of the lovely flowering Kaveri! O You who never leave my heart! Lord, Your sacred feet alone have I cherished.',
  note:'Six small Kanchi shrines are Divya Desams because of this one verse.'},
 {ns:[55], by:'Thirumangai Azhwar', ref:'Thirunedunthandakam 9',
  ta:'வங்கத்தால் மாமணி வந்துந்து முந்நீர் மல்லையாய்\nமதிள் கச்சியூராய், பேராய்\nகொங்கத்தார் வளங்கொன்றை யலங்கல் மார்வன்\nகுலவரையான் மடப்பாவை யிடப்பால் கொண்டான்\nபங்கத்தாய் பாற்கடலாய் பாரின் மேலாய்\nபனிவரையினுச்சியாய் பவள வண்ணா\nஎங்குற்றா யெம்பெருமான் உன்னை நாடி\nஏழையேன் இங்ஙனமே உழிதருகேனே',
  en:'O You of Mallai by the sea, where ships bring great gems to the shore! O You of walled Kachi! O You of Per! O You who share the body of the one whose chest wears the honeyed konrai garland and who keeps the mountain king\'s daughter on his left! O You of the Milk Ocean! O You upon the earth! O You on the snowy mountain\'s peak! O Coral-hued One! Where have You gone, my Lord? Seeking You, wretched I wander about like this.',
  note:'"Pavala vanna", Coral-hued, is the name of the Kanchi Lord of this shrine.'}
];
/* Where each temple is sung. Codes: PT Periya Thirumozhi, PAT Periyazhwar Thirumozhi, PeT Perumal Thirumozhi,
   NT Nachiyar Thirumozhi, TP Thiruppavai, TVM Thiruvaimozhi, MT/IT/MoT/NmT Mudhal/Irandam/Moondram/Nanmugan Thiruvandadi,
   TCV Thiruchanda Viruttam, TNT Thirunedunthandakam, TKT Thirukkurunthandakam, PTM Periya Thirumadal,
   TM Thirumalai, TPE Thiruppalliyezhuchi, AP Amalanadipiran. Ranges like 5.4-5.8 are whole decads. */
const WORKS = {PT:['Periya Thirumozhi','periya thirumozhi'],PAT:['Periyazhwar Thirumozhi','periyAzhwAr thirumozhi'],PeT:['Perumal Thirumozhi','perumAL thirumozhi'],NT:['Nachiyar Thirumozhi','nAchchiyAr thirumozhi'],TP:['Thiruppavai','thiruppAvai'],TVM:['Thiruvaimozhi','thiruvAimozhi'],MT:['Mudhal Thiruvandadi','mudhal thiruvandhAdhi'],IT:['Irandam Thiruvandadi','iraNdAm thiruvandhAdhi'],MoT:['Moondram Thiruvandadi','mUnRAm thiruvandhAdhi'],NmT:['Nanmugan Thiruvandadi','nAnmugan thiruvandhAdhi'],TCV:['Thiruchanda Viruttam','thiruchchandha viruththam'],TNT:['Thirunedunthandakam','thirunedundhANdagam'],TKT:['Thirukkurunthandakam','thirukkuRundhANdagam'],PTM:['Periya Thirumadal','periya thirumadal'],TM:['Thirumalai','thirumAlai'],TPE:['Thiruppalliyezhuchi','thiruppaLLiyezhuchchi'],AP:['Amalanadipiran','amalanAdhipirAn'],KNS:['Kanninun Siruthambu','kaNNinuN chiRuththAmbu']};
const SING_RAW = `
1|TVM 7.2;PeT 1-3;PAT 4.8-4.10;NT 11;TM 1-45;TPE 1-10;AP 1-10;PT 5.4-5.8
2|PT 9.2.5
3|PT 5.6.2
4|PAT 2.8;PT 5.3
5|NmT 36
6|TVM 10.8;PT 5.9;TNT 8
7|TKT 19
8|PT 5.2
9|NmT 50
10|PT 5.1
11|PTM (one line naming Adanur)
12|TVM 5.8;IT 97;PT 6.8.9
13|TVM 6.3;PT 6.1-6.3
14|PT 6.4-7.3;TNT 16-17
15|PT 7.4
16|PT 7.10
17|PeT 8;TVM 9.10;PT 8.1-8.10
18|PT 9.1
19|PT 9.2
20|PT 2.5.3;IT 70;PT 1.1.6;PT 7.3.9
21|PT 5.10
22|PT 4.10
23|PT 7.5-7.8
24|PT 7.9
25|PT 8.9.9;PTM
26|PT 4.9
27|PT 4.6
28|PT 3.4
29|PT 3.10
30|PT 4.2
31|PT 4.3
32|PT 3.8
33|PT 3.9
34|PT 3.5-3.7
35|PT 4.1
36|PT 4.4
37|PT 4.5
38|PT 4.7
39|PT 4.8
40|PeT 10;PT 3.2-3.3
41|PT 3.1
42|MT 1-100;IT 1-100;MoT 1-100;PT 2.10
43|IT 96;MoT 1;TNT 1;PT 6.10.4
44|PT 2.8;MoT 99
45|TNT 14
46|MoT 26;MoT 34;MoT 62
47|TNT 8
48|IT 94;TCV 63-64
49|TNT 8
50|TNT 8;TNT 13;TCV 63-64
51|MT 77;MoT 26;MoT 64;TCV 63-64;PT 2.6.5
52|TNT 8
53|TNT 8
54|TNT 8
55|TNT 9
56|PT 2.9
57|PT 2.7.8
58|PT 2.5.2;PT 7.10.5
59|PT 2.2;NmT 36
60|PT 2.3;MoT 16;NmT 35
61|PT 2.4
62|PT 2.7
63|PT 2.5-2.6;IT 70
64|PT 8.9.4;MoT 61
65|TVM 9.8
66|PeT 5
67|TVM 9.6
68|TVM 9.7
69|TVM 5.9;PT 9.7
70|TVM 8.6
71|TVM 8.4
72|TVM 8.9
73|TVM 7.10
74|TVM 6.1
75|TVM 10.2
76|TVM 10.6
77|TVM 8.3.7
78|TVM 5.5;PT 9.5-9.6;TNT 14
79|TVM 5.7
80|TVM 9.2.4;TVM 9.2.8
81|TVM 9.2.4
82|TVM 9.2
83|TVM 6.5
84|TVM 8.2.4
85|TVM 6.7
86|TVM 7.3
87|TVM 4.10
88|PAT 2.2.6;NT 5.5
89|PT 5.6.2;IT 70;TNT 17
90|NmT 39;PT 9.2.5
91|TVM 2.10;TVM 10.7;PAT 4.2-4.3;NT 9;PT 9.8-9.9
92|TVM 10.1
93|PAT 1.1-1.2;PAT 4.4;PT 9.10
94|PT 9.3-9.4
95|TKT 19;TNT 19
96|PeT 9;PeT 10;PAT 3.10
97|PT 1.6
98|PT 1.2
99|PAT 4.7
100|PT 1.3-1.4;PAT 4.7.9
101|PT 1.5;PAT 2.9.5
102|TP 5;NT 12;TVM 9.1
103|PAT 2.2.5;NT 12.2;NT 13.10
104|PAT 4.1.6;NT 4.8;TVM 5.3.6
105|PT 1.7
106|TVM 3.3;TVM 6.10;PeT 4;NT 8;PT 1.8-1.10;PT 2.1;MT 39-40
107|TP 2;PAT 5.1.2;TVM 2.5.7;PeT 4.4
108|TVM 10.9;TVM 4.4.1;MT 68-77
`;
const SING = {};
SING_RAW.trim().split('\n').forEach(l => { const [n, refs] = l.split('|'); SING[+n] = refs.split(';').map(r => { const m = r.trim().match(/^([A-Za-z]+)\s*(.*)$/); return {w: m[1], r: m[2]}; }); });
/* Tamil script to a readable Latin transliteration (ISO 15919 letters, with the usual voicing of k c t p between vowels and after nasals). */
function tamilTr(s){
  const V={'அ':'a','ஆ':'ā','இ':'i','ஈ':'ī','உ':'u','ஊ':'ū','எ':'e','ஏ':'ē','ஐ':'ai','ஒ':'o','ஓ':'ō','ஔ':'au'};
  const S={'ா':'ā','ி':'i','ீ':'ī','ு':'u','ூ':'ū','ெ':'e','ே':'ē','ை':'ai','ொ':'o','ோ':'ō','ௌ':'au'};
  const C={'க':'k','ங':'ṅ','ச':'c','ஞ':'ñ','ட':'ṭ','ண':'ṇ','த':'t','ந':'n','ப':'p','ம':'m','ய':'y','ர':'r','ல':'l','வ':'v','ழ':'ḻ','ள':'ḷ','ற':'ṟ','ன':'ṉ','ஜ':'j','ஷ':'ṣ','ஸ':'s','ஹ':'h','ஃ':'ḵ'};
  const toks=[]; const ch=[...s];
  for(let i=0;i<ch.length;i++){ const c=ch[i];
    if(V[c]) toks.push({t:'v',s:V[c]});
    else if(C[c]){ const nx=ch[i+1]; if(nx==='்'){ toks.push({t:'c',s:C[c],k:c}); i++; } else if(S[nx]){ toks.push({t:'c',s:C[c],k:c}); toks.push({t:'v',s:S[nx]}); i++; } else { toks.push({t:'c',s:C[c],k:c}); toks.push({t:'v',s:'a'}); } }
    else toks.push({t:'o',s:c}); }
  const voice={'k':'g','c':'s','ṭ':'ḍ','t':'d','p':'b'}, nasalVoice={'k':'g','c':'j','ṭ':'ḍ','t':'d','p':'b'};
  for(let i=0;i<toks.length;i++){ const x=toks[i]; if(x.t!=='c'||!voice[x.s]) continue;
    const p=toks[i-1], n=toks[i+1]; const dbl=(p&&p.t==='c'&&p.s===x.s)||(n&&n.t==='c'&&n.s===x.s);
    if(dbl) continue;
    if(p&&p.t==='c'&&['ṅ','ñ','ṇ','n','m','ṉ'].includes(p.s)) x.s=nasalVoice[x.s];
    else if(p&&p.t==='v'&&n&&n.t==='v') x.s=voice[x.s];
    else if((!p||p.t==='o')&&x.s==='c') x.s='s'; }
  return toks.map(x=>x.s).join('');
}
const singLabel = x => (WORKS[x.w]||[x.w])[0] + (x.r ? ' ' + x.r : '');
const singSearch = x => `https://www.google.com/search?q=${q('site:divyaprabandham.koyil.org '+((WORKS[x.w]||[x.w,x.w])[1])+' '+String(x.r).replace(/-.*/,''))}`;
