export type Article = {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  readMinutes: number
  date: string
  tags: string[]
  image: string
  caption: string
}

const articles: Article[] = [
  {
    slug: 'building-software-for-the-way-nepal-works',
    title: 'Building software for the way Nepal works',
    excerpt:
      'The best local software pays attention to how people already work, then removes the friction that gets in their way.',
    body: `When I sit with a team before building anything, I ask them to show me the work as it happens. I want to see the register on the desk, the spreadsheet that everyone trusts, the phone call that settles a question, and the signature that cannot be skipped. A process diagram gives me a starting point. The working day gives me the product.

In Nepal, those details carry context that a generic template misses. A municipality may keep a record in Nepali while another office reads the same information in English. An organization may use a fiscal year that does not match the dates a new system puts at the top of a report. A field team may have an unreliable connection and still need to record an important visit. These conditions are part of the brief. They are not unusual cases to push into a backlog.

The first decision I make is usually a small one. Which part of the process causes the most repeated work? Which record gets copied from one place to another? Which person has to remember a rule that the system should explain? I start there. A single clear form can remove more friction than a large dashboard if it carries the right decision and leaves the rest of the workflow familiar.

Language matters in the same way. Translation is not only a button that changes English labels into Nepali labels. It affects names, dates, search, printed records, and the confidence a person has when they submit something important. If the office uses one set of words, the system should not make the staff learn a second set just to complete a form. Labels should follow the work.

The same applies to identity and access. A small organization may have one person who receives a request, another who checks it, and a manager who approves it. The system needs to show those responsibilities without turning the process into a maze of technical permissions. Good access control makes the next action clear. It also keeps a useful record of who changed what.

I have found that local context often appears in the edges of a project. The main workflow looks familiar. The edge contains the real requirement: a document that must print correctly, a date that needs a second calendar, a name that has several accepted spellings, or a report that has to travel from a local office to a central one. I look for those edges early because they decide whether a system feels natural after launch.

This way of working does not mean building a different product for every office. It means separating the stable parts from the local decisions. Records, roles, search, backups, and reporting can follow clear patterns. The language, approval path, and document shape can respect the organization that uses them. That balance keeps a system maintainable without asking people to work around it.

The useful question is simple: what does this team already understand, and where does the current process make them spend time without adding value? The answer gives me a better starting point than a list of fashionable features.

Software should meet people where the work is. If a workflow is worth improving, I want to understand its real shape before I draw the first screen.`,
    category: 'Context',
    readMinutes: 5,
    date: '2026-08-10',
    tags: ['Nepal', 'Localization', 'Workflow'],
    image: '/articles/building-software-for-the-way-nepal-works.svg',
    caption: 'A field visit, drawn on the way out — Janakpur, Nepal.'
  },
  {
    slug: 'the-work-after-the-launch',
    title: 'The work after the launch',
    excerpt:
      'A system proves itself after the launch call, when records, backups, ownership, and an ordinary Tuesday all have to keep moving.',
    body: `A launch is easy to recognize. There is a final meeting, a list of links, a few screenshots, and a message that says the system is live. The harder moment arrives a week later, when the person who knows the most is away and someone else needs to complete the work without asking for a tour of the code.

That moment shapes how I think about delivery. A system is not finished when the interface looks complete. It is ready when the people responsible for it can understand the next step, recover from a mistake, and find the record they need. The work after launch deserves the same attention as the work before it.

I start with ownership. Someone should know who checks the backups, who can create an account, who reviews a failed job, and who decides whether a change is safe to release. The answer does not need to be a large operations department. It needs to be written down and easy to find. When ownership stays inside one person’s memory, the system carries a risk that no interface can hide.

I also want logs that a person can read. A log entry should answer three questions: what happened, when did it happen, and what should someone do next? Technical detail has a place, but a team needs a useful signal before it needs a stack trace. A failed import, a rejected approval, or a payment that did not settle should leave enough information for the responsible person to begin an investigation.

Backups follow the same rule. A backup that exists only in a plan does not help anyone. The job needs to run, the team needs to know whether it succeeded, and someone needs to test a restore. The restore is the important part. It shows whether the organization can recover the records it considers important, not only whether a file appeared in a storage bucket.

The support path should stay short. When a user gets stuck, they should know whether to check a label, retry an upload, contact an administrator, or report a system problem. A short playbook for the three issues that happen most often can save more time than a long manual that nobody opens. I prefer instructions that describe the actual screen and the actual decision in front of the person.

Small changes also need a home. A team should be able to record what changed, why it changed, and who checked it. This habit protects the system from silent drift. It also makes future work easier because the next person can see which decisions already exist. A clear change record turns maintenance into a conversation instead of a guess.

The best feedback often arrives after people use the system at full speed. A form that felt fine during a demonstration may be slow when ten staff members submit records at once. A report that looked complete may leave out the one field a manager needs every Friday. I want that feedback early, and I want the team to feel comfortable pointing at the part that still gets in their way.

The work after launch has no dramatic finish line. It is a series of small checks that keep records accurate and people confident. That is the part I care about most because it is where software becomes part of a routine.

If your system works in a demo but creates questions in daily use, that is a useful place to start a conversation. The next improvement usually sits close to the work.`,
    category: 'Practice',
    readMinutes: 4,
    date: '2026-08-08',
    tags: ['Operations', 'Reliability', 'Software'],
    image: '/articles/the-work-after-the-launch.svg',
    caption: 'The week after launch: backup windows, on-call rotation, owner notes.'
  },
  {
    slug: 'from-janakpur-to-kathmandu',
    title: 'From Janakpur to Kathmandu',
    excerpt:
      'A professional origin story shaped by two places, a systems engineering education, and the decision to build useful software in Nepal.',
    body: `A profile can turn a person into a list of places and credentials. Janakpur. Kathmandu. A degree. A company. Those details matter, but they do not explain what I pay attention to when I build a system. For that, I have to look at the path between them.

My public profile lists Janakpur as my hometown and Kathmandu as the city where I live and work. The two places give me a useful way to think about software in Nepal. Work does not happen in one uniform environment. A system may begin with a central plan and end with a person working through a local office, a school, a shop, or a field visit. The distance between those places shows up in the details.

I studied BSc (Hons) Computer Systems Engineering at the University of Sunderland and also studied at The British College Kathmandu. Before that, I went to Saurya International College. Education gave me concepts, tools, and a way to reason about systems. Projects gave those ideas a place to become useful. I learned that a technical solution has to survive contact with the person who uses it at the busiest part of the day.

That lesson keeps returning in my work. A database can be well designed and still fail the organization if the search does not match the way staff remember a record. An interface can look polished and still slow people down if it hides the next decision. A deployment can be technically correct and still leave the team exposed if nobody knows how to restore a backup or report a problem.

My work now sits at that meeting point between software and routine. I lead Aasha Tech Pvt. Ltd. as Managing Director and Founder, and I build websites, management systems, billing tools, data platforms, and workflow software. The projects vary, but the starting question stays close to the same: what does this organization need to do more clearly and with less repeated effort?

Working from Kathmandu also keeps the practical side of technology close. Clients and teams have different levels of infrastructure, different ways of recording information, and different expectations about support after delivery. A useful system has to respect those conditions. It needs to be understandable to the person who uses it and maintainable by the person who will look after it later.

The geography is part of my professional identity, but it is not a slogan. Nepal is the place where I learned to take context seriously. Janakpur reminds me that a system should make sense beyond the central office. Kathmandu gives me a place to work with organizations that are trying to improve how they operate. The software has to connect both sides.

I do not think a portfolio should present a perfect path. Mine is a working one. Study, project work, client conversations, deployment, support, and the next problem have shaped each other. The result is a preference for software that earns trust through use rather than presentation.

If you are building from Nepal and want a system that fits the work your organization already understands, that is the kind of conversation I know how to start.`,
    category: 'Field notes',
    readMinutes: 4,
    date: '2026-08-06',
    tags: ['Nepal', 'Practice', 'Origins'],
    image: '/articles/from-janakpur-to-kathmandu.svg',
    caption: 'Two places, one path: Janakpur to Kathmandu.'
  },
  {
    slug: 'why-aasha-tech-focuses-on-useful-systems',
    title: 'Why Aasha Tech focuses on useful systems',
    excerpt:
      'The strongest software work starts with the records, decisions, and handoffs an organization has to get right every day.',
    body: `Aasha Tech Pvt. Ltd. is the company I lead as Managing Director and Founder. The name matters less than the kind of work it represents. I started the company around a practical question: where does an organization lose time because its records, decisions, and handoffs live in too many places?

The answer is different for every team. A school may need one clear place for student records and communication. A municipality may need a dependable path for applications, certificates, dispatch, and audit history. A business may need its sales, inventory, invoices, and reports to agree with each other. The technology changes with the problem. The standard stays the same: the system has to help the organization make the next correct decision.

That is why I prefer the word useful. Useful software does not ask people to admire it. It gives them a record they can find, a form they can finish, and a report they can understand. It reduces the number of times someone has to copy the same information or call another person to confirm what the system should already know.

The first phase of a project is a conversation about work. I want to know who receives the request, who checks it, who approves it, and what happens when the request is incomplete. I ask which reports matter at the end of the week and which records people still keep outside the system. These questions expose the actual shape of the organization.

From there, I build around the core workflow. A digital records platform needs reliable identity, permissions, search, and a history of changes. An agriculture survey system needs a clean path from field collection to analysis and reporting. A billing platform needs invoices, payments, customer records, and financial views that agree. An inventory system needs stock movement to match what happens at the counter. The details are practical because the work is practical.

The handoff matters as much as the build. A system should leave the organization with clear access, understandable screens, and a support path that does not depend on one person being available at all times. Training should follow the workflow. Documentation should answer the questions that actually come up. The team should know what to do when a record is wrong, an import fails, or a new staff member joins.

The public side of a company matters too. A website should explain what the organization does, show the work without exaggeration, and make the next conversation easy. That is part of the same system thinking. A visitor should not have to translate a vague promise into a service they can use.

I keep Aasha Tech focused on this layer because it is where software becomes accountable. A new feature can look good in a presentation. A correct record, a shorter approval path, and a report that arrives on time show up in the working day.

If your organization has a workflow that depends on repeated calls, duplicated records, or a spreadsheet that nobody else can safely edit, it may be ready for a clearer system. Start with the workflow. The software comes after.`,
    category: 'Practice',
    readMinutes: 5,
    date: '2026-08-04',
    tags: ['Aasha Tech', 'Systems', 'Organizations'],
    image: '/articles/why-aasha-tech-focuses-on-useful-systems.svg',
    caption: 'A workspace where routine records carry the day.'
  },
  {
    slug: 'the-quiet-discipline-behind-a-growing-software-practice',
    title: 'The quiet discipline behind a growing software practice',
    excerpt:
      'Technical study matters, but dependable delivery comes from quieter habits: listening closely, naming things clearly, and staying with the work after it ships.',
    body: `Software work rewards the visible parts. A new screen is easy to show. A finished website makes a good image. A launch gives a project a date that everyone can point to. The habits that keep the work trustworthy are quieter, and they take longer to notice.

I learned the technical foundations through systems engineering study and through projects that forced the concepts to become real. A diagram is useful until a person has to enter the record. A model is useful until two teams use the same word for different things. A deployment is useful until the first person needs help after the project team has left the call.

The first habit is listening before naming the solution. I ask people to describe the work in their own words. The vocabulary matters because it becomes the vocabulary of the system. When a product invents names that the team does not use, every screen adds a small translation task. Those tasks accumulate. Clear labels remove them.

The second habit is keeping decisions visible. A system grows through small choices about records, roles, dates, approvals, and ownership. I want those choices to be easy to explain. If only one person knows why a field exists or why a permission works a certain way, the system depends on memory. A short note can protect a decision better than a complicated abstraction.

The third habit is making the next change small enough to understand. A large rewrite can feel clean at the beginning, but it makes it harder to see which change created a new problem. Small releases give the team a chance to check the result against the work. They also give users a clear moment to say what still feels wrong.

The fourth habit is staying close to the routine after delivery. I want to know which screen people avoid, which report they export, and which question appears in support messages. That information tells me more than a launch-day reaction. It shows where the system has become part of the job and where it has not.

The fifth habit is leaving the work readable. Another developer should be able to follow the data, understand the roles, and find the place where a change belongs. The organization should be able to find its documents, manage its access, and ask for help without opening a mystery. Readability is a delivery feature.

These habits do not produce the loudest portfolio. They produce software that people can carry forward. That is the standard I want for my practice as I continue building with organizations in Nepal and beyond.

The next project usually begins with a problem that sounds ordinary: a record is hard to find, a report takes too long, or a team repeats the same call every day. Those problems deserve careful work. If you can describe yours, I can help you decide whether software is the right next step.`,
    category: 'Craft',
    readMinutes: 5,
    date: '2026-08-02',
    tags: ['Craft', 'Learning', 'Delivery'],
    image: '/articles/design-systems-for-quiet-delivery.svg',
    caption: 'A field note on shipping without a launch drama.'
  },
  {
    slug: 'software-systems-for-slow-workflow',
    title: 'Designing software for slow, manual workflows',
    excerpt:
      'Most of the systems I build start with a process that already works on paper. The job is to remove the friction without losing the people who run it.',
    body:
      'When a workflow has lived on paper for years, the wrong move is to replace the whole process with software on day one. The better move is to keep the muscle memory of the team, map the parts that actually break under load, and ship the smallest dependable piece that gives people time back.\n\nA useful first step is to walk through the workflow with the people who do the work. Note every signature, every duplicate register, every spreadsheet that quietly carries the truth. Then pick one decision that the team has to make repeatedly and ask whether a single form could carry it — even if the data still lives in the same place it always did.\n\nThe systems I am proudest of are the ones that nobody had to retrain anyone on. The interface reads like the workflow it replaced, only faster, and the report at the end of the month is the report the team would have written by hand. That is a complete redesign of the boring kind.',
    category: 'Field notes',
    readMinutes: 5,
    date: '2026-07-12',
    tags: ['Workflow', 'Process', 'Operations'],
    image: '/articles/designing-software-for-slow-workflow.svg',
    caption: 'A paper register kept by the team who runs the workflow.'
  },
  {
    slug: 'small-nepal-teams-large-systems',
    title: 'Small teams in Nepal ship large systems',
    excerpt:
      'The teams behind the systems most public institutions actually rely on are not large. They are tight, careful, and deeply accountable.',
    body:
      'I have worked with schools, municipalities, businesses, and small organizations across Nepal. The pattern is consistent. The team is two to six people, everyone carries real responsibility, and the system has to keep working long after the launch call.\n\nWhat helps is treating deployment as one milestone, not the finish line. Logs that anyone on the team can read. Backup jobs that run without being asked. A short, written playbook for the three most common things that will go wrong. None of that is glamorous. All of it is the difference between a system that quietly keeps serving and a system that quietly stops.\n\nThe good news is that small teams can absolutely run serious infrastructure. The discipline is the same as anywhere — small, predictable changes, tested before they ship, and a habit of reading what actually happened last week.',
    category: 'Practice',
    readMinutes: 4,
    date: '2026-06-04',
    tags: ['Teams', 'Operations', 'Nepal'],
    image: '/articles/small-nepal-teams-large-systems.svg',
    caption: 'A small team running the system that keeps a school in session.'
  },
  {
    slug: 'why-quiet-interfaces-win',
    title: 'Why quiet interfaces win on ordinary Tuesdays',
    excerpt:
      'The interface that gets applause on launch day is rarely the one people trust six months later. The one that wins is calm.',
    body:
      'A new interface is exciting for about ten minutes. After that, what matters is whether it gets out of the way. Can a tired person on a slow network still finish the form? Can the report they need be one click away, every time? Does the system explain itself the same way on the first and the hundredth use?\n\nThe interfaces I keep returning to have a few things in common. They have one job per screen. They do not invent vocabulary. They treat labels like load-bearing architecture. They never use motion to hide a missing state — they say the state out loud instead.\n\nThis is not the same as minimal. A quiet interface can still be rich. It just refuses to make noise where the user did not ask for it. That restraint is what makes a tool feel like it has always been there.',
    category: 'Craft',
    readMinutes: 3,
    date: '2026-05-18',
    tags: ['Design', 'UX', 'Craft'],
    image: '/articles/why-quiet-interfaces-win.svg',
    caption: 'A Tuesday afternoon, a quiet form, the work finished on time.'
  },
  {
    slug: 'nepali-context-in-software',
    title: 'Building software that respects Nepali context',
    excerpt:
      'Names, calendars, fonts, and the small details of how people actually work are not decoration. They are the system.',
    body:
      'A bilingual form that switches between English and Nepali is a start, but it is not the finish. There is a difference between a system that supports Nepali input and a system that respects how Nepali institutions actually work.\n\nFiscal years here do not always align with the calendar on the screen. Office hours start when they start. A register that the field office keeps in Devanagari needs to read correctly when the province office opens it in English. These details are not edge cases. They are the product.\n\nWhen a system honours these details, the people using it stop translating between their job and the software. That is when the work gets faster, the records get cleaner, and the people who maintain the system can actually explain it to the next person.',
    category: 'Context',
    readMinutes: 4,
    date: '2026-04-09',
    tags: ['Nepal', 'Localization', 'Craft'],
    image: '/articles/nepali-context-in-software.svg',
    caption: 'A Nepali field name, rendered with care — Devanagari and Latin.'
  },
  {
    slug: 'small-software-decisions',
    title: 'The smallest decision that changed the system',
    excerpt:
      'Most of the time, the work that improves a system is not a rewrite. It is one well-placed decision, repeated consistently.',
    body:
      'There is a pattern I keep seeing in systems that have grown quietly over years. They are not the product of one brilliant re-architecture. They are the product of one or two small decisions — usually naming, usually a contract between modules — that someone made carefully and the rest of the team respected.\n\nA consistent way to name records. A single source of truth for the date a thing happened. A rule about who can edit what and when. These decisions are not exciting, but they are the ones that decide whether a system grows or rots.\n\nIf you cannot point to the small decision that holds your system together, that is probably the place to start the next round of work. Not a new feature. Not a rewrite. Just the next decision, made carefully, and shared.',
    category: 'Field notes',
    readMinutes: 4,
    date: '2026-03-22',
    tags: ['Architecture', 'Practice'],
    image: '/articles/smallest-decision-system.svg',
    caption: 'One well-placed decision, repeated consistently across the system.'
  },
  {
    slug: 'working-with-public-institutions',
    title: 'Working with public institutions, patiently',
    excerpt:
      'Public-sector software moves slowly because the work is serious. The mistake is to mistake that slowness for resistance.',
    body:
      'Public institutions are not slow because their teams are careless. They are slow because the records they keep matter to real people, and the process of changing a record has consequences that the rest of us rarely see.\n\nThe right posture, when working with a public team, is patience. Show up. Listen to the way the work actually happens. Ask which form is the one that the team is proud of, because that is the form that has been refined by a hundred small corrections. Then propose the smallest change that respects the form and removes the part that is breaking under load.\n\nDone well, a public-sector engagement looks less like a launch and more like a long conversation. The wins are not the screenshots. They are the records that are correct because nobody had to fight the system to keep them correct.',
    category: 'Practice',
    readMinutes: 5,
    date: '2026-02-14',
    tags: ['Public sector', 'Process', 'Nepal'],
    image: '/articles/public-institutions-patiently.svg',
    caption: 'A municipality’s office, working through a slow Tuesday.'
  },
]

export function getArticles(): Article[] {
  return articles.slice().sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticle(slug: string): Article | null {
  return articles.find((a) => a.slug === slug) ?? null
}

export function getArticleSlugs(): string[] {
  return articles.map((a) => a.slug)
}

export function getArticleCategories(): string[] {
  return Array.from(new Set(articles.map((a) => a.category)))
}

export type AdjacentArticle = {
  article: Article | null
  direction: 'prev' | 'next'
  index: number | null
}

export function getAdjacentArticles(slug: string): {
  previous: AdjacentArticle;
  next: AdjacentArticle;
  currentIndex: number;
} {
  const sorted = getArticles()
  const currentIndex = sorted.findIndex((a) => a.slug === slug)
  if (currentIndex === -1) {
    return {
      previous: { article: null, direction: 'prev', index: null },
      next: { article: null, direction: 'next', index: null },
      currentIndex: -1,
    }
  }
  // Articles are sorted newest-first, so index+1 = older article = "previous" in time
  const previousArticle = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null
  const nextArticle = currentIndex > 0 ? sorted[currentIndex - 1] : null
  return {
    previous: {
      article: previousArticle,
      direction: 'prev',
      index: previousArticle ? currentIndex + 2 : null,
    },
    next: {
      article: nextArticle,
      direction: 'next',
      index: nextArticle ? currentIndex : null,
    },
    currentIndex,
  }
}
