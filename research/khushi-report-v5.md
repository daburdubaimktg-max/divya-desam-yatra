# Divya Desam pasuram collection - report (v5)

Collected on 16 November 2026. Output: `divyadesam-verses-v5.json` (73 entries, temple-number order). Raw downloads are in `raw/`.

## Counts

- Temples requested: 73. Entries written: 73. Entries with Tamil text: 73.
- checked = "match": 10
- checked = "minor differences": 62
- checked = "mismatch": 0
- checked = "Tamil only": 1
- checked = "koyil only": 0
- checked = "not found": 0
- Tamil text with checked = match or minor differences: **72** (target was at least 65).
- Of the 62 "minor differences", 27 differ only in word joining (sandhi); 35 also have at least one spelling or word-level difference, all listed below (most are single letters).

## Not found / not cross-checked

- **95 Thirumeyyam - Thirukkurunthandakam 19 (NDP 2050)**: Tamil text found (Project Madurai). koyil.org has no verse pages for Thirukkurunthandakam, so there is no transliteration and no koyil link: checked = "Tamil only". dravidaveda.org has the same text, but it is evidently the same e-text as Project Madurai, so it is not an independent check.
- No temple was left without Tamil text.

## References changed, and why

- **19 Thirunagai**: table says Periya Thirumozhi 9.2 -> first verse 9.2.1 (NDP 1758). 9.2.1 does not name the temple; the only verse in the decad that names நாகை is the last, **9.2.10 (NDP 1767)**, which was taken.
- **96 Thiruvayodhi**: table's first reference is Perumal Thirumozhi 9 -> 9.1 (NDP 730). No verse in decad 9 names Ayodhya (9.1 only says வளநகரம், "the rich city"). Took the first verse of the second listed reference, **Perumal Thirumozhi 10.1 (NDP 741)**, which opens with அயோத்தி. **This is the same verse as temple 40 (Thiruchitrakoodam).** If the app should not show one verse for two temples, a non-duplicate alternative in the same decad that also names Ayodhya is Perumal Thirumozhi 10.8 (NDP 748). Its Tamil text as published by Project Madurai (pmuni0005_02.html), not cross-checked against koyil.org:

```
அம்பொனெடு மணிமாட அயோத்தி யெய்தி
அரசெய்தி அகத்தியன்வாய்த் தான்முன் கொன்றான்
றன்பெருந்தொல் கதைக்கேட்டு மிதிலைச் செல்வி
உலகுய்யத் திருவயிறு வாய்த்த மக்கள்
செம்பவளத் திரள்வாய்த்தன் சரிதை கேட்டான்
தில்லைநகர்த் திருச்சித்ர கூடந் தன்னுள்
எம்பெருமான் றஞ்சரிதை செவியால் கண்ணால்
பருகுவோ மின்னமுதை மதியோ மின்றே
```
- **11 Thiru Adanur**: Periya Thirumadal has no verse numbers that all editions share. Took Project Madurai's 4-line block 2777 (its block 65), which is the couplet naming ஆதனூர் plus the next couplet. koyil.org numbers the same lines as kanni 88 (lines 130-131).
- **80 Thiruvaikuntam and 81 Thiruvaragunamangai** share Thiruvaimozhi 9.2.4 (NDP 3687) because the table gives the same first reference for both; the verse names both (and Pulingudi). Not a change, but the app will show one verse for two temples.
- All other temples use the first reference in the table unchanged, and each verse was checked to name the temple or its Lord.

## Mismatches

No verse was a mismatch (wrong verse, or missing/extra lines). Every koyil.org page found is the same verse as the Tamil text, with letter-level similarity of 0.97 or higher after normalising the romanisation.

## Word-level differences between the Tamil text and koyil.org

These go beyond word joining. The Tamil is given exactly as published; nothing was corrected. "PM" = Project Madurai. Where PM looks like a typing slip, a reviewer who knows the verse may want to correct it by hand before it goes into the app.

| # | Temple | Ref (NDP) | Difference |
|---|---|---|---|
| 4 | Thiruvellarai | Periyazhwar Thirumozhi 2.8.1 (192) | PM சதிரர்கள் / koyil sadhurargaL. |
| 10 | Thiruppullam Bhoothangudi | Periya Thirumozhi 5.1.1 (1348) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): ArmankyaynaT ~ ArmanaynaT |
| 11 | Thiru Adanur | Periya Thirumadal (2777) | PM தமிழி / koyil thamizhai (PM looks like a typing slip for தமிழை); PM ஆண்டாளக்கும் / koyil ANdaLakkum; koyil's 'AdhanaUr' is a slip on the koyil page for AdhanUr. |
| 16 | Thirukkannamangai | Periya Thirumozhi 7.10.1 (1638) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): mpotincuva ~ mpotiyincuva |
| 19 | Thirunagai | Periya Thirumozhi 9.2.10 (1767) | PM இரண்டுமொ ரொன்றும் / koyil iraNdum OronRum (vowel length). |
| 23 | Thiruvazhundur | Periya Thirumozhi 7.5.1 (1588) | PM வுருவில் / koyil uruvin. |
| 27 | Thirukkavalambadi | Periya Thirumozhi 4.6.1 (1298) | PM நவின்றிங் கேத்த / koyil navinRangu Eththa; PM மன்னும் / koyil mannu. |
| 29 | Arimeya Vinnagaram | Periya Thirumozhi 3.10.1 (1238) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): ikaZumnAnkU ~ ikaZunAnkU |
| 32 | Manimada Koil | Periya Thirumozhi 3.8.1 (1218) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): ntAramninRu ~ ntAraninRu |
| 34 | Thiruvali Thirunagari | Periya Thirumozhi 3.5.1 (1188) | PM ரசோகி ளிளந்தளிர்கள் / koyil asOgin iLandhaLirgaL. |
| 41 | Thiruvahindrapuram | Periya Thirumozhi 3.1.1 (1148) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): alkantuyinR ~ alkanTuyinR |
| 46 | Thiruvelukkai | Moondram Thiruvandadi 26 (2307) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): ArtantuZAyA ~ ArtanTuZAyA |
| 48 | Thiruppadagam | Irandam Thiruvandadi 94 (2275) | PM முகில்வண்ணம் / koyil mugilvaNNan; PM மார்பிடந்து / koyil mArvidandhu. |
| 56 | Parameswara Vinnagaram | Periya Thirumozhi 2.9.1 (1128) | பணிநத (in both Project Madurai and dravidaveda) / koyil paNindha - looks like a typing slip for பணிந்த in the Tamil e-text; left as published. |
| 61 | Thiruneermalai | Periya Thirumozhi 2.4.1 (1078) | PM கென்றானும் / koyil endhAnum; PM இலாதவனுக்குக் குறையுமிடம் / koyil ilAdhavanukku uRaiyum idam. |
| 65 | Thirunavai | Thiruvaimozhi 9.8.1 (3750) | PM நிறுத்தம் / koyil niRuththum; PM சோலைகள்சுழ் / koyil sOlaigaL sUzh; PM கொலொ / koyil kolO (the three PM forms look like typing slips). |
| 66 | Thiruvithuvakkodu | Perumal Thirumozhi 5.1 (688) | PM விற்றுவக்கோட் டம்மானே / koyil viththuvakkOttammAnE (known variant spelling of the temple name); PM அதுவேபோன்று / koyil adhu pOnRu. |
| 67 | Thirukkatkarai | Thiruvaimozhi 9.6.1 (3728) | PM செஞ்சம் / koyil நெஞ்சம் (PM looks like a typing slip); PM எஞ்செய்கேன் / koyil என் செய்கேன்; PM ends with a full stop, koyil with a question mark. |
| 68 | Thirumoozhikkalam | Thiruvaimozhi 9.7.1 (3739) | NEEDS A HAND FIX BEFORE DISPLAY: PM has a stray Latin 'f' inside the verse ('குடக்கூத்தர்க் கென்fதூதாய்'; koyil reads engudakkUththarkken thUdhAy). It is left exactly as published because the second source (dravidaveda.org/3847) has several worse slips in this verse. Also PM இரைத்தேர்ந்து / koyil irai thErndhu; koyil 'thuraiyum' for துறையும் is a romanisation slip on the koyil page. |
| 69 | Thiruvallavazh | Thiruvaimozhi 5.9.1 (3321) | PM மதுமல்லிகை யுங்கமழும் / koyil madhu malligai kamazhum; PM அடியேண் / koyil adiyEn (PM looks like a typing slip for அடியேன்). |
| 71 | Thiruchenkundrur | Thiruvaimozhi 8.4.1 (3596) | PM மீமசை / koyil மீ மிசை (PM looks like a typing slip). |
| 72 | Thiruppuliyur | Thiruvaimozhi 8.9.1 (3651) | PM என்செய்கேனா / koyil en seygEnO (PM looks like a typing slip for கேனோ); koyil 'vay' for வாய் is a slip on the koyil page. |
| 73 | Thiruvaranvilai | Thiruvaimozhi 7.10.1 (3552) | PM பொழில் சூழ்திரு வாறன்விளை / koyil aNi pozhil thiruvARanviLai (koyil has no சூழ்); PM உறைகின்றாணி / koyil uRaiginRa aNi. |
| 79 | Thirucheeravaramangai | Thiruvaimozhi 5.7.1 (3299) | PM ஆற்ற கின்றிலேன் / koyil ARRagiRkinRilEn. |
| 80 | Thiruvaikuntam | Thiruvaimozhi 9.2.4 (3687) | PM புளிகுடி / koyil puLingudi; PM நளிந்த / koyil naLirndha; PM சீருலகம் / koyil sIr uLagam. |
| 81 | Thiruvaragunamangai | Thiruvaimozhi 9.2.4 (3687) | PM புளிகுடி / koyil puLingudi; PM நளிந்த / koyil naLirndha; PM சீருலகம் / koyil sIr uLagam. |
| 82 | Thiruppulingudi | Thiruvaimozhi 9.2.1 (3684) | PM தொண்டரோர்க்கு / koyil thoNdararOrkku. |
| 84 | Thirukkulanthai | Thiruvaimozhi 8.2.4 (3577) | PM வலவினை / koyil valavanai. |
| 86 | Thirupperai | Thiruvaimozhi 7.3.1 (3475) | PM திருப்பே ரையில் / koyil thiruppEreyil; koyil 'soillich' is a slip on the koyil page. |
| 94 | Thiruppullani | Periya Thirumozhi 9.3.1 (1768) | PM வித்தெழல் கொண்டு / koyil naiviththu ezhil koNdu; PM மணிநீழல் / koyil maNaneezhal. |
| 98 | Thiruppirithi | Periya Thirumozhi 1.2.1 (958) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): RuElamnARut ~ RuElanARut |
| 99 | Thirukkandam Kadinagar | Periyazhwar Thirumozhi 4.7.1 (391) | PM களைந்திடுகிற்கும் / dravidaveda களைந்திட கிற்கும் / koyil kaLaindhida kiRkum. |
| 102 | Vada Mathura | Thiruppavai 5 (478) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): iltOnrumani ~ iltOnRumani |
| 104 | Thiruthuvarai | Periyazhwar Thirumozhi 4.1.6 (333) | PM சிங்காசனத்தே / koyil chingAdhanaththE; koyil 'eRi' (short e) for ஏறி. |
| 105 | Singavel Kundram | Periya Thirumozhi 1.7.1 (1008) | Small spelling or joining difference, shown in normalised romanisation (koyil ~ Tamil source): anALiTiRay ~ anALiyiTiRay |
| 107 | Thiruppaarkadal | Thiruppavai 2 (475) | koyil's own romanisation is inconsistent on this old page (thIkkuraLai, sendru, uyyumAru with r for R); the words are the same. |

## Tamil text taken from the second-choice source

For four verses the Project Madurai file contains characters that cannot be shown as they stand, so `ta` and `source_ta` come from dravidaveda.org instead. The Project Madurai reading is recorded here:

- **26 Thiruvindalur** (Periya Thirumozhi 4.9.1, NDP 1328): Project Madurai's file has a detached vowel sign ('வென்றிரங்க ி'). Project Madurai text:

```
நும்மைத் தொழுதோம் நுந்தம் பணிசெய் திருக்கும் நும்மடியோம்,
இம்மைக் கின்பம் பெற்றோ மெந்தாய் இந்த ளூரீரே,
எம்மைக் கடிதாக் கரும மருளி ஆவா வென்றிரங்க ி,
நம்மை யொருகால் காட்டி நடந்தால் நாங்க ளுய்யோமே?
```
- **56 Parameswara Vinnagaram** (Periya Thirumozhi 2.9.1, NDP 1128): Project Madurai's file has a stray Latin 'f' inside this verse ('வணங்குகழற்f'). Project Madurai text:

```
சொல்லுவன் சொற்பொருள் தானவை யாய்ச்சுவை
யூறொலி நாற்றமும் தோற்றமுமாய்,
நல்லரன் நான்முகன் நாரண னுக்கிடந்
தான்தடஞ் சூழ்ந்தழ காயகச்சி,
பல்லவன் வில்லவ னென்றுல கில்பல
ராய்ப்பல வேந்தர் வணங்குகழற்f
பல்லவன், மல்லையர் கோன்பணிநத பர
மேச்சுர விண்ணக ரமதுவே.
```
- **58 Thirunindravur** (Periya Thirumozhi 2.5.2, NDP 1089): Project Madurai's file has underscore placeholders in this verse ('பொய்ந்_லை மெய்ந்_லென்'). Project Madurai text:

```
பூண்டவத்தம் பிறர்க்கடைந்து தொண்டுபட்டுப்
பொய்ந்_லை மெய்ந்_லென் றென்றுமோதி
மாண்டு,அவத்தம் போகாதே வம்மினெந்தை
என்வணங்கப் படுவானை, கணங்களேத்தும்
நீண்டவத்தைக் கருமுகிலை எம்மான்தன்னை
நின்றவூர் நித்திலத்தைத் தொத்தார்சோலை,
காண்டவத்தைக் கனலெரிவாய்ப் பெய்வித்தானைக்
கண்டதுநான் கடல்மல்லைத் தலசயனத்தே.
```
- **99 Thirukkandam Kadinagar** (Periyazhwar Thirumozhi 4.7.1, NDP 391): Project Madurai's file has a stray space inside a word ('எம்புருடோ த்தமனிருக்கை'). Project Madurai text:

```
தங்கையைமூக்கும்தமையனைத்தலையும்தடிந்த எம்தாசரதிபோய்
எங்கும்தன்புகழாவிருந்துஅரசாண்ட எம்புருடோ த்தமனிருக்கை
கங்கைகங்கையென்றவாசகத்தாலே கடுவினைகளைந்திடுகிற்கும்
கங்கையின்கரைமேல்கைதொழநின்ற கண்டமென்னும்கடிநகரே.
```

## One verse that needs a hand fix

- **68 Thirumoozhikkalam** (Thiruvaimozhi 9.7.1, NDP 3739): the Project Madurai text has a stray Latin letter, `கென்fதூதாய்`. It was left as published (rule: do not correct), and dravidaveda's copy of this verse has worse slips, so it was not substituted. The `f` should be removed by hand (giving கென்தூதாய், which is what koyil.org's transliteration reads) before the verse is shown in the app.

## Method and things the reviewer should know

- Tamil source: Project Madurai's Nalayira Divya Prabandham files (pmuni0005_01/02, pmuni0006_01/02, pmuni0007, pmuni0008_01/02), parsed by script by running number. `ndp` is Project Madurai's running number.
- From each Project Madurai verse, only the editorial labels were removed: the running number, the trailing reference (for example "4.2.1" or "(4.2.1)") and the "(2)" recite-twice mark. Line breaks, spacing, punctuation and spelling are as published. Project Madurai prints some verses in half-lines (8 lines) and others in full lines (4 lines); that is kept as is.
- Project Madurai joins and splits words by metre, not by meaning (for example "கூட லூரே"), and uses a full stop where modern editions use "!". This is the source's style, not an error in copying.
- koyil.org: each page was located through the site's WordPress API; only the verse paragraph was copied into `koyil_translit`. No translation, word meaning or commentary was copied into the JSON. The files in `raw/koyil/` are the unedited API responses and therefore do contain koyil.org's English commentary; they are for checking only and should not be reused in the app.
- Three koyil.org pages (67 Thirukkatkarai, 71 Thiruchenkundrur, 76 Thiruvattaru) print the verse in Tamil script only, so `koyil_translit` is empty for them and the check was Tamil against Tamil.
- Cross-check: the Tamil was converted by script to a rough romanisation, koyil.org's transliteration was normalised the same way, and the two were compared letter by letter with spaces ignored. Differences in word joining (elided u, glide y/v, nasal assimilation, doubled consonants) count as sandhi; everything else is in the table above. The normalisation does not tell ந/ன/ண apart or single from doubled consonants, so differences of only that kind would not be caught, except where noticed by eye.
- dravidaveda.org was also downloaded for each verse (`raw/dravidaveda/`). Its text is almost always identical to Project Madurai's, slips included, so it was not treated as an independent witness. Its running numbers for Thiruvaimozhi are 108 higher than Project Madurai's.
- trsiyengar.com and ta.wikisource.org were not needed.

## All 73 entries

| # | Temple | Reference | NDP | checked |
|---|---|---|---|---|
| 4 | Thiruvellarai | Periyazhwar Thirumozhi 2.8.1 | 192 | minor differences |
| 8 | Thirukkoodalur | Periya Thirumozhi 5.2.1 | 1358 | match |
| 10 | Thiruppullam Bhoothangudi | Periya Thirumozhi 5.1.1 | 1348 | minor differences |
| 11 | Thiru Adanur | Periya Thirumadal, kanni naming Adanur (Project Madurai block 2777/65; koyil.org kanni 88) | 2777 | minor differences |
| 13 | Thiruvinnagar | Thiruvaimozhi 6.3.1 | 3365 | match |
| 14 | Thirunaraiyur | Periya Thirumozhi 6.4.1 | 1478 | minor differences |
| 16 | Thirukkannamangai | Periya Thirumozhi 7.10.1 | 1638 | minor differences |
| 18 | Thirukkannangudi | Periya Thirumozhi 9.1.1 | 1748 | minor differences |
| 19 | Thirunagai | Periya Thirumozhi 9.2.10 | 1767 | minor differences |
| 21 | Thirunandipura Vinnagaram | Periya Thirumozhi 5.10.1 | 1438 | minor differences |
| 22 | Thiruvelliyangudi | Periya Thirumozhi 4.10.1 | 1338 | minor differences |
| 23 | Thiruvazhundur | Periya Thirumozhi 7.5.1 | 1588 | minor differences |
| 24 | Thiruchirupuliyur | Periya Thirumozhi 7.9.1 | 1628 | match |
| 25 | Thalaichanga Nanmadiyam | Periya Thirumozhi 8.9.9 | 1736 | minor differences |
| 26 | Thiruvindalur | Periya Thirumozhi 4.9.1 | 1328 | minor differences |
| 27 | Thirukkavalambadi | Periya Thirumozhi 4.6.1 | 1298 | minor differences |
| 28 | Kazhicheerama Vinnagaram | Periya Thirumozhi 3.4.1 | 1178 | minor differences |
| 29 | Arimeya Vinnagaram | Periya Thirumozhi 3.10.1 | 1238 | minor differences |
| 30 | Vanpurushottamam | Periya Thirumozhi 4.2.1 | 1258 | minor differences |
| 31 | Semponsei Koil | Periya Thirumozhi 4.3.1 | 1268 | match |
| 32 | Manimada Koil | Periya Thirumozhi 3.8.1 | 1218 | minor differences |
| 33 | Vaikunta Vinnagaram | Periya Thirumozhi 3.9.1 | 1228 | minor differences |
| 34 | Thiruvali Thirunagari | Periya Thirumozhi 3.5.1 | 1188 | minor differences |
| 35 | Thiruthevanar Thogai | Periya Thirumozhi 4.1.1 | 1248 | minor differences |
| 36 | Thiruthetriambalam | Periya Thirumozhi 4.4.1 | 1278 | minor differences |
| 37 | Thirumanikkoodam | Periya Thirumozhi 4.5.1 | 1288 | match |
| 38 | Thiruvellakkulam | Periya Thirumozhi 4.7.1 | 1308 | match |
| 39 | Thirupparthanpalli | Periya Thirumozhi 4.8.1 | 1318 | match |
| 40 | Thiruchitrakoodam | Perumal Thirumozhi 10.1 | 741 | minor differences |
| 41 | Thiruvahindrapuram | Periya Thirumozhi 3.1.1 | 1148 | minor differences |
| 44 | Ashtabuyagaram | Periya Thirumozhi 2.8.1 | 1118 | minor differences |
| 46 | Thiruvelukkai | Moondram Thiruvandadi 26 | 2307 | minor differences |
| 48 | Thiruppadagam | Irandam Thiruvandadi 94 | 2275 | minor differences |
| 56 | Parameswara Vinnagaram | Periya Thirumozhi 2.9.1 | 1128 | minor differences |
| 57 | Thirupputkuzhi | Periya Thirumozhi 2.7.8 | 1115 | minor differences |
| 58 | Thirunindravur | Periya Thirumozhi 2.5.2 | 1089 | minor differences |
| 61 | Thiruneermalai | Periya Thirumozhi 2.4.1 | 1078 | minor differences |
| 62 | Thiruvidanthai | Periya Thirumozhi 2.7.1 | 1108 | minor differences |
| 64 | Thirukkadigai | Periya Thirumozhi 8.9.4 | 1731 | match |
| 65 | Thirunavai | Thiruvaimozhi 9.8.1 | 3750 | minor differences |
| 66 | Thiruvithuvakkodu | Perumal Thirumozhi 5.1 | 688 | minor differences |
| 67 | Thirukkatkarai | Thiruvaimozhi 9.6.1 | 3728 | minor differences |
| 68 | Thirumoozhikkalam | Thiruvaimozhi 9.7.1 | 3739 | minor differences |
| 69 | Thiruvallavazh | Thiruvaimozhi 5.9.1 | 3321 | minor differences |
| 70 | Thirukkadithanam | Thiruvaimozhi 8.6.1 | 3618 | minor differences |
| 71 | Thiruchenkundrur | Thiruvaimozhi 8.4.1 | 3596 | minor differences |
| 72 | Thiruppuliyur | Thiruvaimozhi 8.9.1 | 3651 | minor differences |
| 73 | Thiruvaranvilai | Thiruvaimozhi 7.10.1 | 3552 | minor differences |
| 74 | Thiruvanvandoor | Thiruvaimozhi 6.1.1 | 3343 | minor differences |
| 76 | Thiruvattaru | Thiruvaimozhi 10.6.1 | 3838 | match |
| 77 | Thiruvanparisaram | Thiruvaimozhi 8.3.7 | 3591 | minor differences |
| 79 | Thirucheeravaramangai | Thiruvaimozhi 5.7.1 | 3299 | minor differences |
| 80 | Thiruvaikuntam | Thiruvaimozhi 9.2.4 | 3687 | minor differences |
| 81 | Thiruvaragunamangai | Thiruvaimozhi 9.2.4 | 3687 | minor differences |
| 82 | Thiruppulingudi | Thiruvaimozhi 9.2.1 | 3684 | minor differences |
| 83 | Tholaivillimangalam | Thiruvaimozhi 6.5.1 | 3387 | minor differences |
| 84 | Thirukkulanthai | Thiruvaimozhi 8.2.4 | 3577 | minor differences |
| 85 | Thirukkolur | Thiruvaimozhi 6.7.1 | 3409 | minor differences |
| 86 | Thirupperai | Thiruvaimozhi 7.3.1 | 3475 | minor differences |
| 92 | Thirumohur | Thiruvaimozhi 10.1.1 | 3783 | minor differences |
| 94 | Thiruppullani | Periya Thirumozhi 9.3.1 | 1768 | minor differences |
| 95 | Thirumeyyam | Thirukkurunthandakam 19 | 2050 | Tamil only |
| 96 | Thiruvayodhi | Perumal Thirumozhi 10.1 | 741 | minor differences |
| 97 | Naimisaranyam | Periya Thirumozhi 1.6.1 | 998 | minor differences |
| 98 | Thiruppirithi | Periya Thirumozhi 1.2.1 | 958 | minor differences |
| 99 | Thirukkandam Kadinagar | Periyazhwar Thirumozhi 4.7.1 | 391 | match |
| 100 | Thiruvadari | Periya Thirumozhi 1.3.1 | 968 | minor differences |
| 101 | Thiruchalagramam | Periya Thirumozhi 1.5.1 | 988 | minor differences |
| 102 | Vada Mathura | Thiruppavai 5 | 478 | minor differences |
| 103 | Thiruvaippadi | Periyazhwar Thirumozhi 2.2.5 | 132 | minor differences |
| 104 | Thiruthuvarai | Periyazhwar Thirumozhi 4.1.6 | 333 | minor differences |
| 105 | Singavel Kundram | Periya Thirumozhi 1.7.1 | 1008 | minor differences |
| 107 | Thiruppaarkadal | Thiruppavai 2 | 475 | minor differences |
