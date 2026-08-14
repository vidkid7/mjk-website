import type { Locale } from '@/lib/i18n'
import type { PublicUiCopy } from '@/lib/public-content'

export const fixedCopy: Record<Locale, PublicUiCopy> = {
  en: {
    navigation: {
      menuKicker: 'NAVIGATION / OPEN CHANNEL',
      menuDescription: 'Move through the work, the tools, and the thinking behind the systems.',
      sectionLinks: [{ label: 'About', href: '/#about' }, { label: 'Field Files', href: '/#work' }, { label: 'Skills', href: '/#skills' }, { label: 'History', href: '/#experience' }, { label: 'Contact', href: '/#contact' }],
      pageLinks: [{ label: 'Articles', href: '/articles' }, { label: 'Contact', href: '/contact' }],
    },
    projects: { index: '02', eyebrow: 'Work index', heading: 'Systems built for the work behind the work.', viewLabel: 'View', gridLabel: 'Grid', focusLabel: 'Focus', discussLabel: 'Discuss this system', openLabel: 'Open file', footerPrimary: 'systems / one working method', footerSecondary: 'From public records to everyday operations →' },
    skills: { index: '03', eyebrow: 'System Inventory', heading: 'What I can help you with.', readyLabel: 'Inventory ready', categoriesLabel: 'Categories', toolsLabel: 'Tools in rotation', statusLabel: 'Status', statusValue: 'live / production', practiceLabel: 'Practice live', toolboxLabel: 'Toolbox', toolboxCountLabel: 'tools in rotation' },
    experience: { index: '04', eyebrow: 'Operational History', heading: 'A timeline of the work that shaped me.', filedLabel: 'Filed under', entriesLabel: 'Entries', statusLabel: 'Status', statusValue: 'Live / compiling', footnote: 'Each entry is a chapter of the same practice — software, systems, and the people they serve. The dossier stays open.' },
    testimonials: { index: '05', eyebrow: 'Verified Reports', heading: 'What people say about working with me.', filedLabel: 'Filed under', transmissionsLabel: 'Transmissions', channelLabel: 'Channel', channelValue: 'Open / verified', footnote: 'Every report is paraphrased with the client’s permission. Names are kept where their organization allows; titles are kept where they help the story.' },
    contact: { terminalLabel: 'TRANSMISSION TERMINAL', statusValue: 'READY · STANDING BY', body: 'Inbound channels are open. Pick the one that fits the work — short briefs, ongoing partnerships, or a quick call to sense whether we should build together.', bodyMeta: 'Long-form briefs welcome. Short intros welcome. So are second opinions.', emailAction: 'Start an email', phoneAction: 'Call directly', footerLabel: 'Channel ready', wiresLabel: 'WIRES · outbound' },
    footer: { brandEyebrow: 'Colophon', statusValue: 'Studio live', compilerLabel: 'Compiler', navigationTitle: 'Navigation', servicesTitle: 'Services', studioTitle: 'Studio', wiresLabel: 'Wires · outbound', topLabel: 'Back to top', musicCredit: '🎵 Music Credit: Gauchha Geet Nepali — Lyrics by 🙏 National Poet Madhav Prasad Ghimire | Music by Ustad Gobinda Lal | © Music Nepal. All rights belong to the respective creators and copyright holders.' },
  },
  ne: {
    navigation: {
      menuKicker: 'नेभिगेसन / खुला च्यानल',
      menuDescription: 'प्रणालीको काम, उपकरण र सोचबीच अगाडि बढ्नुहोस्।',
      sectionLinks: [{ label: 'परिचय', href: '/#about' }, { label: 'कामका फाइल', href: '/#work' }, { label: 'सीप', href: '/#skills' }, { label: 'इतिहास', href: '/#experience' }, { label: 'सम्पर्क', href: '/#contact' }],
      pageLinks: [{ label: 'लेखहरू', href: '/articles' }, { label: 'सम्पर्क', href: '/contact' }],
    },
    projects: { index: '02', eyebrow: 'कामको सूची', heading: 'कामलाई अघि बढाउने प्रणालीहरू।', viewLabel: 'दृश्य', gridLabel: 'ग्रिड', focusLabel: 'केन्द्रित', discussLabel: 'यस प्रणालीबारे कुरा गर्नुहोस्', openLabel: 'फाइल खोल्नुहोस्', footerPrimary: 'प्रणाली / एउटै कार्यविधि', footerSecondary: 'सार्वजनिक अभिलेखदेखि दैनिक कामसम्म →' },
    skills: { index: '03', eyebrow: 'प्रणाली सूची', heading: 'म तपाईंलाई यी काममा सहयोग गर्न सक्छु।', readyLabel: 'सूची तयार', categoriesLabel: 'वर्ग', toolsLabel: 'प्रयोगमा रहेका उपकरण', statusLabel: 'स्थिति', statusValue: 'सञ्चालनमा / उत्पादन', practiceLabel: 'अभ्यास सञ्चालनमा', toolboxLabel: 'उपकरण बाकस', toolboxCountLabel: 'उपकरण प्रयोगमा' },
    experience: { index: '04', eyebrow: 'कार्य इतिहास', heading: 'मलाई बनाएको कामको समयरेखा।', filedLabel: 'अन्तर्गत दर्ता', entriesLabel: 'प्रविष्टि', statusLabel: 'स्थिति', statusValue: 'सक्रिय / संकलन हुँदै', footnote: 'हरेक प्रविष्टि एउटै अभ्यासको अध्याय हो — सफ्टवेयर, प्रणाली र तिनले सेवा गर्ने मानिसहरू। यो डोसियर खुला छ।' },
    testimonials: { index: '05', eyebrow: 'प्रमाणित प्रतिक्रिया', heading: 'मसँग काम गरेका मानिसहरू के भन्छन्।', filedLabel: 'अन्तर्गत दर्ता', transmissionsLabel: 'प्रतिक्रिया', channelLabel: 'च्यानल', channelValue: 'खुला / प्रमाणित', footnote: 'हरेक प्रतिक्रिया ग्राहकको अनुमतिमा पुनःलेखिएको हो। संस्थाले अनुमति दिएसम्म नाम र कथालाई स्पष्ट बनाउने पद राखिएका छन्।' },
    contact: { terminalLabel: 'सम्पर्क टर्मिनल', statusValue: 'तयार · प्रतीक्षामा', body: 'सम्पर्कका माध्यमहरू खुला छन्। कामअनुसार माध्यम छान्नुहोस् — छोटो विवरण, निरन्तर साझेदारी वा सँगै बनाउने सम्भावना बुझ्न छोटो कुराकानी।', bodyMeta: 'विस्तृत विवरण स्वागतयोग्य छ। छोटो परिचय पनि। दोस्रो राय पनि।', emailAction: 'इमेल सुरु गर्नुहोस्', phoneAction: 'सीधै फोन गर्नुहोस्', footerLabel: 'च्यानल तयार', wiresLabel: 'च्यानलहरू · बाहिरी' },
    footer: { brandEyebrow: 'परिचय', statusValue: 'स्टुडियो सक्रिय', compilerLabel: 'कम्पाइलर', navigationTitle: 'नेभिगेसन', servicesTitle: 'सेवाहरू', studioTitle: 'स्टुडियो', wiresLabel: 'च्यानलहरू · बाहिरी', topLabel: 'माथि फर्कनुहोस्', musicCredit: '🎵 संगीत श्रेय: गाउँछ गीत नेपाली — शब्द: 🙏 राष्ट्रिय कवि माधवप्रसाद घिमिरे | संगीत: उस्ताद गोविन्द लाल | © म्युजिक नेपाल। सम्पूर्ण अधिकार सम्बन्धित सर्जक तथा प्रतिलिपि अधिकार धारकमा सुरक्षित छन्।' },
  },
}

export function copyFor(locale: Locale): PublicUiCopy {
  return fixedCopy[locale]
}
