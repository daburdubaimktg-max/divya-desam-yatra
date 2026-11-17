# Builds src/verses5.js from Khushi's divyadesam-verses-v5.json.
# English renderings are Claude's study drafts (keyed by NDP number), not copied translations.
import json, sys
from pathlib import Path

SRC = Path(sys.argv[1])
d = json.loads(SRC.read_text(encoding="utf8"))

EN = {
192: ("Indra with Brahma, Isa and all the gods have come in disguise and stand here carrying flowers consecrated with mantras. O You who stand at Vellarai, home of skilled people whose mansions touch the moon! It is now the evening hour; come, my beautiful One, and let me tie on Your protective charm.",
      "Periyazhwar sings as Yasoda, calling the child for the evening kaappu (protection) ritual."),
1358: ("It looks like the town of the King who went as a messenger for kings, never counting His own greatness: Koodalur, where the tresses of fine young women, with fingers like kanthal flowers and soft garments, are fragrant.", ""),
1348: ("He whom even knowing cannot fully know, who owns all the worlds and rules me, the Dancer who became a little brahmin boy, lives here: Pullam Bhoothangudi, where bees hum over fragrant flowers, lovely maidens dance and spotted-winged bees sing.", ""),
2777: ("Him, the Lord who rules at Adanur; who is yesterday, today and tomorrow; who is the four Vedas abiding on Neermalai; who is Pullani; who is southern Tamil and northern Sanskrit; (and who is) at Nangur…",
       "A passage from the Periya Thirumadal, a single long poem with no verse divisions shared by all editions. The line runs on into the next couplet."),
3365: ("He has become poverty and wealth, hell and heaven, fierce enmity and friendship, poison and nectar. The Lord spread out in all these many forms, who rules me: I saw Him at Thiruvinnagar, rich with prosperous families.",
       "The verse of opposites: the Lord is present in everything, the pleasant and the painful alike."),
1478: ("Before your eyes start to roll, before phlegm and wheezing come and you gasp, before women with voices sweet as music tell you to 'walk slowly', come, my rising heart: let us go to Naraiyur and worship Him who became the sky, the mountains, the Vedas and the sacrifices.",
       "A call to worship while there is still strength in the body."),
1638: ("The great ocean, the mighty bull, female and male, the penance that gives grace to countless sages, a string of pearl clusters, the very life of His devotees, the like of pure pearls, the bud and the full flower, the longing of my heart, sugarcane full of sweet nectar, the ripe fruit: I went seeking Him and found Him at Kannamangai.", ""),
1748: ("My Master, whose great form has the colour of the dark ocean, reclining on the long, striped serpent, holding the conch in His lovely hand, the lotus at His navel, stands at Thirukkannangudi, among people of steady mind who study the six limbs of the Veda, the five sacrifices, the four Vedas and the rare arts, and tend the three fires with their own hands.", ""),
1767: ("Kalikanri, king of Mangai with its fine great walls, of lasting glory, sang these ten verses of good words in sweet music on the Primal One who became the swan, the boar and the fish, the Beautiful One of Nagai. Those who master them will rule the world as kings and then rejoice as gods.",
      "The closing verse (phala-sruti) of the Thirunagai decad, the only verse in it that names the temple. The decad opens with the verse shown on Uraiyur and Srirangam."),
1438: ("He became earth free of evil, fire, wind, water and the spreading sky; He became the stainless mind, sleep and death. He who trembled when His mother was angry after He ate the curd, who danced with the pots, the broad-chested Lord of greatness: O heart, draw near to Nandipura Vinnagaram, the town where He dwells.", ""),
1338: ("Our Lord, who ate the butter when the cowherd women called Him, who once grew on a banyan leaf, who drank the demoness's breast, broke the twin marudha trees and measured the great earth: His temple is Thiruvelliyangudi, on the south bank of the Manni, where water flows among great groves of fruiting areca, plantain and coconut everywhere.", ""),
1588: ("It seems this is the town where my Father, my Lord, came in the dark night, when the heavy fetters on His father's feet fell open, and where He stays: Azhundur of beautiful streets, where the sky pours rain before its season and Vedic scholars of ageless form tend the fire at the three twilights.", ""),
1628: ("You who worship His feet, wanting deceit to leave the heart: think of Him who dwells reclining at Siruppuliyur Salasayanam, where the waves of the ancient flooding sea spread and gems sparkle all along the shore, and who dwells within my heart as well.", ""),
1736: ("When can it be said that I have gazed my eyes' fill here on Him, the moon of the gods, the blazing sun spreading its rays, in Kannapuram that fills the eye, at Kadigai, and on the western side of Thalaichangam ringed by cool, fragrant lotuses, and rejoiced?",
       "'Nanmadhiyam', the moon of the gods, gives the temple its name."),
1328: ("We have worshipped You; we are Your servants who live doing Your service; we have found joy in this life, our Father, O Lord of Indalur! If You would quickly give us our task, take pity and say 'Ah!', show Yourself to us just once and walk, would we not be saved?",
       "Tradition says Thirumangai Azhwar reached Indalur after the doors had closed; the whole decad is a loving quarrel with the Lord."),
1298: ("You who measured the whole world in a stride, who entered the great flowering pool and, as the elephant cried out its praise, ended its terror of the crocodile! O Kanna who dwells at Kavalambadi in Nangai, where Vedic scholars live amid great wealth: You alone are my refuge.", ""),
1178: ("You who long to reach the feet of the generous Lord who became a dwarf, begged three steps of land, took in all the worlds with two steps and put Mahabali in bonds, saying 'Give!': go to Sirama Vinnagaram in Kazhi, of fitting fame, where the four Vedas, the five sacrifices, the six limbs of the Veda and the seven notes of music thrive, with festivals filling the streets.", ""),
1238: ("The place where He sits, with the Lady of the Lotus and the Lady of the Earth shining on either side, granting grace to His devotees so their evil deeds leave them, while the seven worlds bow and the gods praise: where Vedic scholars of great fame live, where pools everywhere glow with screwpine, red lilies and lotuses, and groves embrace the hills. Bow to Arimeya Vinnagaram in beautiful Nangur, my simple heart.", ""),
1258: ("The temple of Him who dammed the great surging sea, cut off with His arrows the ten bright crowns of Lanka's king and gave the kingdom to his brother, is Vanpurushottamam in Nangur, surrounded by red-flowered trees, champak, madhavi creepers, mango and plantain, where fragrant areca palms rise tall.", ""),
1268: ("I have seen Him and been saved: the Lord of great grace whom all the world worships and praises, with the Lady of the Lotus and the Lady of the Earth beside Him, in the Semponsei temple at the heart of Nangai with its splendid mansions. He looks like a dark rain cloud standing still.", ""),
1218: ("'Lamp that never goes out! You whom none can measure! Nara and Narayana! My Father, like a great dark cloud, have mercy on us!' So the gods stand and praise Him in the place where, in every direction, bees sing honey-sweet in the gandhara mode, drunken bees hum in the deep shade and the mandara tree is fragrant: bow, my heart, to Manimada Koil in Nangur.", ""),
1228: ("Bow, my simple heart, to Vaikunta Vinnagaram in Nangur, where kayal fish circle and play through rich groves fragrant with jasmine, bright serundhi and champak that shower their flowers: the temple where the Lord whose form is like a fine dark cloud, who tore open the broad chest of the wrathful Hiranya and churned the great sea to take the nectar, dwells happily day after day.", ""),
1188: ("You came and entered the heart of me, Your servant; since You entered, You are sweet to the mind that bows to You. My Sri! My dear life! O Lord of Thiruvali, where tender asoka shoots mingle everywhere, glowing like red fire.", ""),
1248: ("Thiruthevanar Thogai, in Nangai of fields, where Madhavan dwells on the southern bank of the broad Manni, whose clashing waves beat around groves of open flowers and scatter their pollen, and where striped bees sing a song like 'thena'.", ""),
1278: ("See: He is Kannan, who came and appeared so that the gem crowns of hostile kings, their strength and splendour, the ear-rings of their beloved queens and the fetters on His father's feet all fell away together, and who saved the elephant in distress. He is my red-eyed Lord of Thiruthetriambalam in Nangur, where in hollows filled with hundred-petalled lotuses the old spathes of young areca and gaping crabs scatter white pearls in the mud.", ""),
1288: ("My Father, who graciously ended the suffering of the elephant with its palm-like trunk, who held up the bamboo-covered hill and shielded the cowherds from the fierce rain, is at Thirumanikkoodam in Nangur, where the flowering Ponni flows in everywhere, carrying gold, and honey-laden groves are fragrant.", ""),
1308: ("O dark One, whose sacred form is like the ocean that fills the eye! My Master in Thiruvellakkulam, ringed by strong walls, in Nangur, home of those who win at the battlefront: remove the distress of me, Your servant.", ""),
1318: ("'Kannan who broke the tusk of the elephant', 'the King whose form is like a blue-lily cloud of lovely glory, my elephant', 'the Consort of the Lotus Lady in Nangai of tall white mansions': my coral-lipped daughter keeps singing of Parthanpalli.",
       "A mother speaks of her daughter's love for the Lord (the Azhwar in the voice of Parakala Nayaki)."),
741: ("When will the day come when my eyes are cooled by seeing Him: the light that lights all the worlds from the beautiful city called Ayodhya, ringed by long walls; who appeared as the lamp of the line of the hot-rayed Sun; the hero who saved all of heaven; the red-eyed, tall dark cloud, Rama; our unique First One, our Lord, in Thiruchitrakoodam at Thillai?",
      "Kulasekara Azhwar's Ramayana decad, sung at Thiruchitrakoodam (Chidambaram). This verse names Ayodhya, so it is also shown for Thiruvayodhi."),
1148: ("The place of Him who, as the Boar, held the vast cool earth within His curved tusk, and who sleeps on the dark cool great sea, is Thiruvahindrapuram, where swarms of bees drink the honey of fine lotuses, rise humming sweet music through the lovely groves, and settle on fresh serundhi blossoms.", ""),
1118: ("'Who is this, in the form of a lion, who roared like the great sea of breaking waves, so that the One who burnt the three cities and the other seated on the flower marvelled and the three worlds bowed in due order, and who with blazing mane and sharp teeth split Hiranya's body in two?' I asked. He said, 'I am of Attabuyakaram.'",
       "Thirumangai Azhwar's dialogue decad: every verse ends with the Lord answering that He is of Ashtabhujakaram."),
2307: ("My excellent mind, the red-eyed serpent, His dwelling in Kachi long and full of glory, Venkatam, Vehka and the Velukkai settlement: these the Lord who wears cool tulasi will never leave.",
       "One short verse naming Thiruvelukkai together with Tirumala and Thiruvehka (Yathothkari)."),
2275: ("Come near, bow and worship the cloud-coloured One who swallows all the seven worlds. My heart praises Him who tore open the chest of the one who stood against Him, and who sits in flowery Padagam.", ""),
1128: ("He became the speaker, the word and its meaning, and taste, touch, sound, smell and form; He gave a place in His body to good Hara and four-faced Brahma, Narayana. In beautiful Kachi ringed by pools, the place worshipped by the Pallava, lord of Mallai, whose feet many kings bow to and whom the world praises by many names: that is Parameswara Vinnagaram.", ""),
1115: ("She says 'My heart melts at the flute on the lips of the cowherd with the mighty hand'; she sings of Putkuzhi with its clashing waters; she asks 'Is it time to go to Neermalai?' My Father of Idaventhai, my Lord, what have You in mind for her, this tender creeper of the noble Kolli line, slender-waisted, with long cool eyes and lovely shoulders?",
      "From the Idaventhai decad, in a mother's voice: the girl's longing reaches out to Thirupputkuzhi and Thiruneermalai too."),
1089: ("Do not waste your lives depending on others for your ornaments, serving them and forever reciting false books as true. Come! The One I bow to, my Father whom the hosts praise, the dark cloud, my Master, the pearl of Ninravur, who fed the clustered Khandava forest into the mouth of the fire: I saw Him at Thalasayanam in Kadalmallai.",
       "Sung in the Mamallapuram decad. Tradition holds that the Azhwar left Thirunindravur without singing it and, when the Lord followed, named Him here as 'the pearl of Ninravur'."),
1078: ("The places where He dwells, He who once embraced with love the creeper of the cowherd clan and the Lady of the beautiful flower, and showed no mercy at all to the asuras, are Naraiyur of good waters ringed by great groves, Thiruvali, Kudandhai and Kovalur bright with pools. And for Him who stands, sits, reclines and walks, the great hill is Neermalai.",
       "At Thiruneermalai the Lord is seen in all four postures."),
1108: ("Though she knows that the Lady born from the nectar of the rich sea, with a face like the bright white moon, lives on Your chest, she still will not give up her longing. This girl with lovely blue-lily eyes, the doll of Kolli, says she has set her heart on Your feet. What have You in mind for her, my Father of Idaventhai, my Lord?",
      "The first verse of the Idaventhai decad, in a mother's voice."),
1731: ("I reached Him and was saved: the Exalted One, the lamp spread out as the Vedas, who entered within me, the glorious shining mountain of gold, the Worthy One, the Sugar-sweet Fruit seated on the great hill of Kadigai.",
       "'Akkarakkani', the sugar-sweet fruit, is the name of the Lord at Sholinghur."),
3750: ("Is there any way for me, wretched as I am, to reach Thirunavay, ringed by cool groves of fragrant flowers, the place of the Lord whom those of single mind hold firm within, and who cuts away their deeds?", ""),
688: ("Even if You do not stop the sorrow You give me, I have no refuge but Your feet, O Lord of Vithuvakkodu, ringed by groves of fragrant flowers. Like a baby who, even when its own mother pushes it away in anger, cries thinking only of her love, so I have stayed.",
     "One of the best-loved verses on total dependence (saranagati)."),
3728: ("My heart melts beyond what my life can bear, and my longing swells. What shall I do, I, Your servant, whenever I think of the wonders of the Wondrous One who dwells at Thirukkatkarai, where every street is fragrant with blue lilies?", ""),
3739: ("O young crane with red legs, who seeks food in the lovely wide backwaters and rests sweetly here! Be my messenger, with your companions, to my pot-dancer with the honey-rich tulasi crown, who dwells at Thirumoozhikkalam; then your feet will be on my head.",
       "A messenger verse: the Azhwar, as a girl in love, sends a crane to the Lord."),
3321: ("You women with eyes like a deer's! As I, a sinner, waste away day after day: when will I, His servant, reach the feet of the King who dwells at Thiruvallavazh, ringed by honey-rich groves where sky-high areca and honeyed jasmine are fragrant?", ""),
3618: ("So that we rise thinking of Him night and morning, He gives His good graces to us: the town of the Father who wears a crown of fresh cool tulasi is Thirukkadithanam, where prosperous people live.", ""),
3596: ("He broke off the twin tusks of the elephant, a great mountain flowing with must, and rolled it over; He took the life of its strong mahout who came to seize the town; He killed the wrestlers in the arena and smashed Kamsa on his high platform as the kings who came to fight turned and fled. The glorious little cowherd, at Thiruchitraru in Thiruchenkundrur, is our refuge.", ""),
3651: ("The red-hued Lord whose sacred chest, mouth, eyes, hands, navel, feet and garments are like forests of bright lotuses on a dark gem mountain; Thirumal, our Master, the rare Wondrous One of Thiruppuliyur in Kuttanad with its rich watery fields: she speaks of nothing but His names. O mothers, what can I do about this?",
      "A mother speaks of her daughter's love for the Lord."),
3552: ("Our Lord sits in splendour with the beautiful Lady of the flower and rules these seven worlds so that joy arises in them. When will the days come when I, with love, go round Thiruvaranvilai of lovely groves, where He dwells with love, and worship with joined hands?", ""),
3343: ("O flock of cranes that come every day to feed in the flowering backwaters! When you see my Lord with fruit-red lips, who holds the discus in His hand and dwells at Thiruvanvandoor, where red paddy grows tall in the fields, join your hands and tell Him of the love of this sinner.",
       "A messenger verse sent through the cranes."),
3838: ("His devotees are the ones who receive grace; and to me, servant of His devotees' servants, the Lord of the discus has resolved to give His grace. That is our good fortune. In this great world that brings darkness I want no more births. Leave your confusion, simple heart, and bow to the feet of the Lord of Vattaru.", ""),
3591: ("Those who come and go will not tell my case to my Lord with Sri on His chest, who sits at fertile Parisaram. What can I do? Will they not tell Him that while He carries the shapely discus and conch, there is one servant here suffering alone, apart from Him?", ""),
3299: ("I have done no penance, I have no subtle knowledge; still, I can no longer bear to be away from You for a moment, my Lord on the serpent bed! My Father seated in Sirivaramangala Nagar, where lotuses bloom in the mud among red paddy: I am Yours there, nothing apart from You.", ""),
3687: ("You who recline at Pulingudi, sit at Varagunamangai and stand at Vaikuntam, my Lord who rules me without ever leaving my clear mind! Grace me: come so that I may see Your fruit-like lips reddening like coral within a crystal cloud, while the three worlds of cool glory marvel and we dance and shout for joy.",
       "One verse that holds three of the Nava Tirupati temples, in the three postures: reclining, seated and standing."),
3684: ("O You who recline at Thiruppulingudi, ringed by cool fields and the clear-waved Porunal! By Your grace and the grace of the Lady of the Lotus, from days of old we Your servants have come generation after generation to keep Your temple clean. Open Your radiant lips and look on us with Your lotus eyes.", ""),
3387: ("O mothers, do not hope for this girl any more; let her go. She has worshipped Tholaivillimangalam with its towering mansions of flawless gems. Saying 'the bright white conch and discus', saying 'the wide lotus eyes', she stands and stands, her blue-lily eyes brimming with tears, and sobs.",
       "A mother speaks of her daughter's love for the Lord."),
3577: ("I went to join Him; what is left for me to give? I lost my bangles and everything my heart held, without a trace; day after day, before women wearing many bangles, I lost all modesty, for love of the Victor of the discus in battle, who raises the banner of the dancing bird, the wondrous Dancer who stands in the west of rich southern Kulandhai with its flag-topped walls.", ""),
3409: ("The rice she eats, the water she drinks, the betel she chews: all are Kannan, my Lord, she says again and again, her eyes brimming. Asking in this world for His town of great glory and riches, my young doe is surely going to Thirukkolur.",
       "A mother's lament for her daughter, who has left home for Thirukkolur."),
3475: ("He holds the white spiral conch and the discus, the lotus-eyed One; see how He drives my heart. How shall I tell you, mothers? I will go to Thirupperai, where the sound of the Vedas, the sound of festivals and the sound of children at play never stop, where the Lord of flooding joy sits in splendour.", ""),
3783: ("I have no refuge other than the dark rain cloud with four shoulders, curling hair, lotus eyes and fruit-red lips, who stands always in Thirumohur of lotus-stalked, broad, gem-like fields, staying there gladly to destroy the asuras.", ""),
1768: ("I, of strong karma, will not torment myself; I worship and rise. The place of the Lord who made me pine, took my beauty and went away is beautiful Pullani, ringed by groves of punnai with pearl-like buds, and by the fragrant shade of serundhi blossoms that put gold to shame.",
       "Tentative in places: the reading of the second line differs between the Tamil e-text and koyil.org (see the source note)."),
2050: ("He removed the curse of the one who carried a skull and wandered eating at others' houses; this is the town of that One. Those who throng saying 'Kandiyur, Arangam, Meyyam, Kachi, Per, Mallai', places the world praises, will surely be saved; can others be saved?",
       "Names Thirumeyyam with five other Divya Desams. Kandiyur is where tradition says Siva was freed of Brahma's skull."),
998: ("I desired the reward of women with moon-bright smiles, small foreheads and broad shoulders. Seeing that as a mistake, and wanting to cut off the disease of birth, I, a fool, stayed without support; I thought it over, and thinking of the ways of union with young women I felt ashamed. I have come and reached Your sacred feet, my Father in Naimisaranyam!", ""),
958: ("O heart, go and reach Thiruppiridi in the good Himalaya, where He stays, He who once bent His long bow so that the body of the mighty Vali fell, where great clouds thunder, and peacocks with great plumes climb the hard rocks and dance by the broad springs.", ""),
391: ("Our Dasarathi, who cut off the nose of the sister and the head of the brother, went and ruled as king with His fame everywhere. The dwelling of our Purushottama is the fragrant city called Kandam, standing on the bank of the Ganga, to be worshipped with joined hands; there the mere word 'Ganga, Ganga' can remove grievous karma.",
     "Kandam is Devaprayag, where the Alaknanda and Bhagirathi meet to form the Ganga."),
968: ("Before you are bent double with old age, leaning on a stick, eyes fixed on the ground ahead, tottering as if your legs were broken, and sitting there unable to rise: bow to Badari, the place of Him whose mouth drank dry, through her great breasts, the life of the demoness who came like the mother who bore Him.",
     "The Badari decad urges the listener to go on pilgrimage while still young and strong."),
988: ("He crossed the forest where deer, elephants and horses roam, with bow and arrows as His companions; on the battlefield of victory He built a dam of mountains across the wave-tossed sea and joyfully cut off the ten heads of the chief of the sword-bearing demons of walled Lanka. O heart, reach Saligramam.", ""),
478: ("The Wondrous One, the son of everlasting northern Mathura, the Lord of the banks of the pure, broad Yamuna, the bright lamp who appeared in the cowherd clan, Damodara who brought glory to His mother's womb: if we come pure, scatter pure flowers and worship Him, sing with our lips and think of Him in our minds, the faults of the past and those yet to come will turn to dust in fire. Say this, our maiden, and come.",
     "Thiruppavai 5, sung in the month of Margazhi."),
132: ("Wicked-minded Kamsa is angry with You. If he watches for a weak moment and traps You by trickery, I cannot live, Vasudeva! You have seen what comes of mothers' words; I have told You plainly, do not go. Lamp of the cowherds' village, come, sit and feed at my breast.",
     "Periyazhwar as Yasoda, calling the child to feed."),
333: ("If you are searching for the place where He dwells, the One the colour of a great gem, who drank the life from the breasts of the demoness of evil form until she died: there are those who have seen Him seated on the throne in Thuvarai by the sea, surrounded by many thousands of great queens and all.", ""),
1008: ("The place of the pure One who, as a fierce man-lion there, tore open the swelling chest of the asura with sharp claws so that the vast beautiful world trembled, is Singavel Kundram, where red-eyed lions, in devotion, bring the tusks of green-eyed elephants and lay them at His feet.", ""),
475: ("You who live in this world, listen to what we do for our vow: we sing the feet of the Supreme One who sleeps softly in the milk ocean; we will not eat ghee, we will not drink milk; we bathe before dawn; we will not line our eyes or put flowers in our hair; we will not do what should not be done; we will not go about speaking harsh words; we will give alms and charity as far as we can, and rejoice, thinking of the way to be saved, our maiden.",
     "Thiruppavai 2: the vow of the Margazhi observance."),
}

SHORTREF = {2777: "Periya Thirumadal, kanni 88 (koyil.org numbering)"}
DRAVIDA = {1328, 1128, 1089, 391}

groups = {}
for e in d:
    groups.setdefault(e["ndp"], []).append(e)

out = []
for ndp, es in sorted(groups.items(), key=lambda kv: min(x["n"] for x in kv[1])):
    e = es[0]
    if ndp not in EN:
        raise SystemExit(f"missing English for {ndp}")
    ta = e["ta"].replace("கென்fதூதாய்", "கென்தூதாய்")  # hand fix requested in report (68)
    assert "f" not in ta and "_" not in ta, (ndp, ta)
    en, note = EN[ndp]
    src = "dravidaveda.org" if ndp in DRAVIDA else "Project Madurai"
    if e["checked"] == "Tamil only":
        v = f"{src} (no second source online to cross-check)"
    else:
        v = f"{src}, cross-checked with koyil.org ({e['checked']})"
    srcnote = e.get("notes") or ""
    if ndp == 3739:
        srcnote = "A stray Latin letter in the Project Madurai text (கென்fதூதாய்) was removed by hand; otherwise as published. " + srcnote
    out.append(dict(
        ns=sorted(x["n"] for x in es), by=e["by"], ref=SHORTREF.get(ndp, e["ref"]), ndp=ndp,
        ta=ta, tr=e.get("koyil_translit") or "", en=en, note=note, v=v,
        kl=e.get("source_koyil") or "", sl=e["source_ta"], src=srcnote if e["checked"] != "match" else ""))

js = ("/* v5 pasurams, collected by Khushi on 16 Nov 2026 (divyadesam-verses-v5.json).\n"
      "   ta: Tamil exactly as published by Project Madurai (or dravidaveda.org where noted); one stray letter removed for 68.\n"
      "   tr: transliteration as published on divyaprabandham.koyil.org (empty where koyil.org has none; the app then generates one).\n"
      "   en: English study drafts by Claude, to be checked by reviewers. */\n"
      "const VERSES5 = " + json.dumps(out, ensure_ascii=False, indent=0) + ";\n")
Path("src/verses5.js").write_text(js, encoding="utf8")
print(len(out), "verse entries for", sum(len(x["ns"]) for x in out), "temples")
