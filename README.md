Faculty of Informatics 
Department of Information Systems
Practical Attachment Report



Tsion Tesfaye
BCS Computer and Finance Solution




Duration : June 23,2026– Aug 23,2026 (2 months)
Date of Submission: 

PRELIMINARY PAGES
DECLARATION

I, Tsion Tesfaye , hereby declare that this Practical Attachment Report is my own original work and has been prepared based on the practical attachment I completed at BCS Computer and Finance Solution over a period of two months. All sources of information used in this report have been duly acknowledged. This report has not been submitted for any other degree or qualification at any other institution.

















ACKNOWLEDGEMENTS
First and foremost, I would like to thank God for giving me the strength and perseverance to complete my practical attachment.
I would like to express my sincere gratitude to my university, Hawassa University, Faculty of Informatics , Department of Information Systems, for arranging and facilitating this practical attachment program.
I am deeply grateful to the management and staff of BCS Computer and Finance Solution for welcoming me into their organization and providing me with a supportive working environment. In particular, I thank my mentor, Gelila, for her invaluable guidance, patience, and willingness to share knowledge and experience.
I also extend my appreciation to the team members with whom I worked, whose cooperation and support made my attachment both productive and enjoyable. Finally, I would like to thank the BCS Coffee Market Consulting subsidiary for the opportunity to work on a real, production-oriented web application as part of the broader BCS Computer and Finance Solution team, which greatly enhanced my practical skills.









EXECUTIVE SUMMARY
This report documents my two-month practical attachment at BCS Computer and Finance Solution, an IT company and training institution in Addis Ababa, Ethiopia, undertaken as a partial requirement for my Information Systems degree in the Information Systems Department at Hawassa University. BCS Computer and Finance Solution provides a comprehensive range of IT services including computer training, software development, web design, engineering software training, graphics and multimedia services, accounting systems, IT consulting, and maintenance services. During my attachment, I was assigned to the Web Development section, where I participated in the design and development of a full-stack web application for BCS Coffee Market Consulting, a specialized subsidiary of BCS that focuses on the coffee export and consulting industry.
The project involved building a seven-page, production-style website using modern front-end technologies including React, TypeScript, Vite, Tailwind CSS, and React Router, along with a Node.js backend API with SQLite database and JWT authentication. My responsibilities covered the full development workflow: requirement analysis with the client, page structure and routing, design system implementation, responsive layout, dark/light theme support, internationalization in four languages, content management, commodity inventory management, interactive maps, photo carousels, search engine optimization, accessibility improvements, and quality assurance through building and linting.
Throughout the attachment, I developed and improved my practical skills in component-based React development, TypeScript type safety, utility-first CSS styling, REST API development, database design with Prisma ORM, and version control. I also gained valuable experience in client communication, requirement clarification, and working within a team. The main challenges I faced included implementing full multilingual support across all pages, building an interactive coffee origins map with real geographic data, creating a photo carousel with touch/drag support, integrating a backend API for commodity management, and ensuring consistent content across multiple languages, each of which I addressed through systematic analysis and appropriate technical solutions.



LIST OF TABLES AND FIGURES
Tables
Table 1: Technologies used in the project
Table 2: Summary of completed work items
Figures
Figure 1: Homepage hero section with photo carousel
Figure 2: About section with company timeline
Figure 3: Services section
Figure 4: Interactive coffee origins map
Figure 5: Our Team page with profile photos
Figure 6: Contact page with opening hours and directions
Figure 7: Admin dashboard with commodity management
Figure 8: Dark mode of the homepage
Figure 9: Amharic language version
Figure 10: Mobile responsive layout
Figure 11: Project folder structure
(Insert screenshots of the website for each figure.)









TABLE OF CONTENTS
Section
Title
Page
Chapter 1
Background of the Hosting Company
7
Chapter 2
My Practical Attachment Experience
11
Chapter 3
Benefits Gained from the Practical Attachment
26
Chapter 4
Conclusion and Recommendations
31


References
34


Appendices
35
















CHAPTER 1: BACKGROUND OF THE HOSTING COMPANY
1.1 Brief History
BCS Computer and Finance Solution is an information technology company and training institution located in Addis Ababa, Ethiopia, established in 2009. The company was founded to bridge the gap between Ethiopia's growing IT needs and the available technical expertise. It provides a comprehensive range of IT services including computer training (basic computer skills, programming, engineering software, graphics, and film editing), software development, web design and development, computerized accounting systems (Peachtree and IFRS), IT consulting (finance, marketing, management, business strategy, import/export documentation), ERP solutions, computer hardware and software sales, and maintenance services. Over the years, it has grown to serve a diverse range of clients both locally and internationally, including students, professionals, SMEs, government institutions, and international organizations. The company has also expanded its operations to include BCS Coffee Market Consulting, a specialized subsidiary that leverages the parent company's IT and consulting expertise to serve the international coffee trade industry.
1.2 Main Products and Services
BCS Computer and Finance Solution is a comprehensive IT company that provides the following main categories of services:

Computer Training Services
Basic Computer Course Training — Introduction to Computer, MS Windows XP 2007/2010, MS Word 2007/2013, MS Excel 2007/2013, MS Access 2007/2013, MS Publisher 2007/2013, MS PowerPoint, Amharic and English typing, and free internet access;
Programming Course Training — C++ or C#.NET, VB.NET, Visual Basic, Java, Database with Access, Database with HTML/PHP/MySQL, and Oracle;
Engineering Software Course Training — Auto CAD, Arci CAD, SAP, SAFE, Eagle Point, MX Roads, IN-Roads, Primavera, MS Project, MTAPS, ETABS, Epanet or Surfer, Terra Model, ANSYS, COMSOL Multiphysics, Archi CAD with Lumion, Rendering Software (BOQ), Arc-GIS, Revit, Catia, CAD Civil 3D, Water Cad, Solid Work, CADCAM, Global Mapper, and C Sharp;
Research Course Application Training — SPSS, STATA, and EPI Info;
Graphics Course Training — Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Corel Draw, and Adobe After Effect;
Film Editing — Adobe Pro CC, Power Director, Sony Vegas Pro, Maya, Flash, Avid Liquid, Adobe Audition CC (radio production), 3D Max Animation, and 3D Max Modeling;
Maintenance Course Training — Computer hardware maintenance, printer maintenance, scanner maintenance, and photocopier machine maintenance.

Computerized Accounting System
Peachtree Accounting 2019;
IFRS (International Financial Reporting Standards) Training;
Other finance and auditing applications.

Website Design and Development
Static Website Design — HTML, JavaScript, CSS, and WordPress;
Dynamic Website Design — HTML, PHP, MySQL, and Joomla.

IT Consulting and Advisory Services
Finance consulting and IFRS consulting — advising businesses on financial management, accounting standards, and compliance;
Peachtree consulting — implementation and support for Sage Peachtree accounting software;
Export and import item consulting — advising businesses on the selection, sourcing, and management of export and import goods;
Export documentation consulting — preparing and reviewing export-related documents such as commercial invoices, bills of lading, certificates of origin, and customs declarations;
Import documentation consulting — preparing and reviewing import-related documents such as import permits, customs declarations, and compliance paperwork;
Marketing consulting — developing marketing strategies, branding, and digital presence for businesses;
Management consulting — advising organizations on operational efficiency, organizational structure, and process improvement;
Business strategy consulting — helping businesses define long-term goals, market positioning, and growth strategies;
Feasibility study and business proposal study;
ERP application design, implementation, maintenance, and training;
Research study and consultancy services.

Other Services
Computer, accessories, and software sales;
Lynda.com online training;
Fiverr online services;
Studio material sales.

The project I worked on falls under the website design and development service, specifically the development of a full-stack web application for BCS Coffee Market Consulting, a client company that operates under the broader BCS brand.
1.3 Main Customers and End Users
The company serves a wide range of customers, including:
Students and individuals seeking computer literacy, programming, engineering software, graphics, and multimedia training;
Small and medium enterprises (SMEs) that need an online presence, accounting systems, or ERP solutions;
Businesses and organizations that require custom software, websites, or IT consulting services;
Coffee exporters, retailers, service providers, and government institutions;
Professionals seeking IFRS, Peachtree, SPSS, or other specialized software training;
Companies needing computer hardware and software sales, maintenance, and repair services.
The end users of the services provided include students who attend training courses, professionals seeking specialized software skills, businesses that receive consulting and development services, and visitors of client websites. For example, in the case of the BCS Coffee Market Consulting project, the end users are international coffee buyers, roasters, and importers who visit the web application to learn about the company, browse commodity catalogs, and contact its consultants.
1.4 Overall Organization and Workflow
The company is organized into a general manager at the top, followed by department heads and technical staff. The company operates several departments and sections to deliver its diverse range of services, including: the Computer Training section (offering basic computer, programming, engineering software, graphics, and film editing courses); the Web Development section (responsible for website design and development for clients); the IT Consulting section (providing finance, IFRS, import/export, marketing, management, and business strategy consulting); the Accounting and ERP section (delivering Peachtree, IFRS, and ERP solutions); the Maintenance and Sales section (handling hardware maintenance, computer sales, and studio materials); and the BCS Coffee Market Consulting subsidiary (focused on the coffee export and consulting industry).
Projects typically flow through the following steps:
Client request — a client approaches the company with a need;
Requirement gathering — meetings are held to understand the client's goals and requirements;
Planning and design — the scope is defined, and design mockups are prepared;
Development — the technical team implements the solution;
Testing and review — the work is checked for quality and corrected;
Delivery — the final product is handed over to the client with documentation.
During my attachment, I was assigned to the Web Development section and followed this workflow while working on the BCS Coffee Market Consulting web application project.


1.5 The Client Company of My Project: BCS Coffee Market Consulting
BCS Computer and Finance Solution operates BCS Coffee Market Consulting as a subsidiary that focuses on the coffee export and consulting industry. While BCS Computer and Finance Solution provides a broad range of IT services, training, and consulting (as described in Section 1.2), BCS Coffee Market Consulting is a specialized arm that leverages the parent company's IT and consulting expertise to serve international coffee buyers. During my attachment, I was assigned to work specifically on the web development needs of BCS Coffee Market Consulting, building a full-stack web application to represent this coffee business to the world.
BCS Coffee Market Consulting is a coffee export and consulting company based in Addis Ababa, Ethiopia. It was founded in 2009 by a team of Ethiopian coffee professionals who saw a gap between Ethiopia's extraordinary coffee heritage and the international buyers seeking it. The company acts as a trusted intermediary between verified Ethiopian coffee exporters and international roasters and importers.
Its main services include coffee consulting, exporter verification, quality sourcing, and market intelligence for international coffee buyers. It helps buyers find the right beans, verify the right suppliers, and close deals on their terms.
Its main customers are coffee roasters, specialty buyers, and importers in Europe, Asia, North America, and the Middle East. To date, the company reports more than 100 verified exporters, serving buyers in over 40 countries, facilitating more than $50 million in trade and shipping more than 5,000 tons of coffee.
The web application I built represents this business to the world: it presents the company's services, the seven coffee regions of Ethiopia, its track record, its team members, and a way for potential buyers to make contact. I also built an admin dashboard that allows the company to manage its commodity inventory, view contact submissions, and edit site content without code changes.
















CHAPTER 2: MY PRACTICAL ATTACHMENT EXPERIENCE
2.1 How I Got into the Company
I got into BCS Computer and Finance Solution through a referral. After being accepted, I was assigned to the Web Development section, where I was given a mentor who guided me throughout the attachment. My first task was introduced to me as a real client project: building a full-stack web application for BCS Coffee Market Consulting, a subsidiary of BCS that specializes in coffee export and consulting for international buyers.
2.2 The Section I Worked In
I worked in the Web Development section of BCS Computer and Finance Solution. This section is responsible for planning, designing, building, and maintaining websites and web applications for the company's clients, including internal projects such as BCS Coffee Market Consulting. The section follows a project-based workflow in which each project is treated as a small project with its own requirements, design, development, and testing phases.
The section works with a modern frontend and backend toolchain. The technologies used in my project are summarized in Table 1 below.



Table 1: Technologies used in the project
Technology
Purpose
React 19
Building the user interface from reusable components
TypeScript
Adding type safety to the codebase
Vite
Development server and production build tool
Tailwind CSS v4
Utility-first styling with a custom design system
React Router
Client-side routing between the seven pages
i18next
Internationalization for four languages (EN, AM, FR, ZH)
Lucide React
Icon library for UI elements
ESLint
Code quality checking
Node.js + Express.js
Backend API server
Prisma ORM
Database schema and queries
SQLite
Lightweight database for production data
JWT Authentication
Secure admin login sessions

2.3 How the Workflow in the Section Looks
The workflow in the section, which I followed throughout the project, consisted of the following stages:
Requirement gathering: We met with the client (BCS Coffee) to understand what the website needed to achieve — presenting the company, its services, the coffee regions of Ethiopia, the team, and a way for buyers to get in touch.
Analysis and planning: The pages and sections of the website were planned. The site structure was defined as: Home, About, Services, Origins, From the Field, Our Team, and Contact, plus an admin dashboard.
Design: A consistent design system was established using Tailwind CSS design tokens — brand colors (deep forest green, gold, cream), typography (Playfair Display for headings, Inter for body text), and reusable components (navbar, footer, buttons, cards, forms).
Development: I built the pages and components, starting with the page structure and routing, then the layout components, then each page's content sections. I also built the backend API with authentication, commodity management, and contact form handling.
Internationalization: I implemented full multilingual support using i18next, translating all content into English, Amharic, French, and Chinese.
Quality assurance: The code was checked with the TypeScript compiler and ESLint, and the production build was generated with Vite. The site was also visually verified in the browser across all languages and themes.
Review and iteration: I presented the work to my mentor and, with feedback from the client, made refinements — for example, correcting contact details, adding the team page, implementing a photo carousel, and adding opening hours.

2.4 Work Tasks I Executed
During the two months, I executed the following work tasks:

Task 1: Setting up the project and page structure
I initialized the React + TypeScript project with Vite, installed the necessary dependencies (React Router, Tailwind CSS, i18next, Lucide icons), and set up the routing so that each of the seven pages is a separate route. I created a shared layout component containing the fixed navigation bar and the footer, so that every page inherits the same structure.

Task 2: Building the homepage
The homepage is the most important page because it is the first impression for visitors. I built it with the following sections:
a hero section with a background photo, headline ("Connecting Ethiopian Coffee Excellence With Global Markets"), an auto-sliding photo carousel with drag/swipe support showing eight coffee-related images, and key statistics (15+ years, 100+ verified exporters, 40+ countries, $50M+ trade);
an "About" section with the company's timeline from 2009 to today;
a services section presenting the six services offered;
an interactive map of Ethiopia's seven coffee regions with a "Get Directions" link, where clicking a region shows its altitude, processing method, harvest season, and a translated description;
a "Why us" section;
a testimonials section; and
a contact section with an inquiry form, embedded map, and "Get Directions" link.

Task 3: Building the supporting pages
I built the About page (company story and statistics), the Services page (detailed service descriptions), the Origins page (the seven coffee regions in detail with a "Get Directions" link), the From the Field page (a photo gallery of coffee farms and processing), the Our Team page (three team members with profile photos, roles, descriptions, and social links), and the Contact page (contact details, opening hours with LT indicators, a map, "Get Directions" link, and the inquiry form).

Task 4: Implementing internationalization (i18n)
I implemented full multilingual support using i18next, translating all content into four languages: English, Amharic, French, and Chinese. Every page — including the team page (names, roles, descriptions), the origins page (region names and descriptions), the services page, and the contact page — updates its content when the language is switched. I also implemented RTL (right-to-left) support for Arabic if needed in the future.

Task 5: Implementing dark mode
The client's preference for a dark theme led me to implement a full dark mode. I created a theme system that:
reads the user's saved preference from the browser's local storage;
falls back to the operating system's light/dark preference and follows changes to it live;
applies the theme before the first paint to avoid a white flash on load;
provides a toggle button in the navigation bar and in the Settings page.
This required defining a complete dark color palette and fixing every hard-coded light color in the components so that the entire site renders correctly in both themes.

Task 6: Building the photo carousel
I built an auto-sliding photo carousel for the homepage hero section that displays eight coffee-related images (farm, farmers, cherries, washing, drying, grading, ceremony, export). The carousel features:
auto-sliding every 3.5 seconds with smooth crossfade transitions;
drag/swipe support for mobile and desktop users;
pause on hover to prevent fighting with user input;
dot indicators for manual navigation;
clickable photos that navigate to the "From the Field" page.

Task 7: Building the Our Team page
I created a dedicated team page with three team members: Bekure Yimam (Founder & Managing Director), Rose Ahmed (Coffee Quality Specialist), and a third team member (Export & Logistics Coordinator). Each card features:
a circular profile photo placeholder (with actual photos for Bekure and Rose);
the member's name, role, and description;
social media icons (LinkedIn, Instagram) where applicable.
The team page is fully translated — names, roles, and descriptions change with the language selector.

Task 8: Implementing commodity management with dropdowns
I built the admin dashboard's commodity management system with structured dropdown menus for:
Source of Coffee (Commercial, Grower, Vertical, Union, Farmer, Value Added);
Coffee Grade (1-5, UG Under Grade, NG No Grade, Perberry Coffee);
Coffee Type (Yirgacheffe, Sidama, Guji, Limu, Jimma, Nekemte, Harrar);
Coffee Status (Green Bean, Roast and Grind, Other);
Processing Type (Washed, Unwashed);
Price per Unit in ETB (Ethiopian Birr).
This ensures data consistency and prevents free-text errors in the inventory system.

Task 9: Implementing the admin dashboard settings
I built the admin Settings page with:
a two-column layout with Social Media Links on the left and Contact Information on the right;
a theme toggle to switch between light and dark mode directly from the admin panel;
configurable placeholders for all social media and contact fields.

Task 10: Content consistency and data management
While reviewing the site, I discovered that the same information appeared in multiple files with different values — for example, phone numbers, email addresses, metrics, and the company address differed between pages. I corrected all of them and then refactored the site so that services, regions, and the contact form live in single shared source files. This change ensures the content can never drift apart again and makes future updates a one-place change.

Task 11: Contact form implementation and opening hours
The site has contact forms on two pages. I implemented the form with proper validation fields (name, company, country, email, coffee interest, and message). Since the project initially had no backend server, I implemented a mail-to mechanism that opens the visitor's email application with a pre-filled message addressed to the client's email address. The code was structured so that it can easily be upgraded to a professional form service such as Web3Forms when the client provides an access key. I also added opening hours to the contact page:
Monday – Friday: 2:30 – 11:30 LT
Saturday: 2:30 – 6:00 LT
Sunday: Closed

Task 12: Search engine optimization and accessibility
I added SEO meta tags (page description, Open Graph image, and Twitter card), created a robots.txt file and a sitemap.xml file, and added a favicon. For accessibility, I ensured sufficient color contrast for small text (meeting WCAG AA standards), added aria-expanded and aria-controls attributes to the mobile menu, and added explicit width and height to all images to prevent layout shift while pages load.

Task 13: Building the backend API
I built a Node.js + Express.js backend with:
JWT authentication for secure admin login;
SQLite database via Prisma ORM for commodities, contacts, site content, and site settings;
REST API routes for admin and public access;
commodity CRUD operations with validation schemas;
contact form submission and management;
site content CMS for editing website text without code changes.

Task 14: Updating the footer
I updated the site footer to display "Designed & Developed by Tsion Tesfaye" with a clickable LinkedIn profile link, replacing the default origin text.

2.5 Procedures I Used While Performing My Tasks
Requirement-first development: I started every task by understanding what the client needed before writing code.
Component-based approach: I broke the interface into small, reusable components (Navbar, Footer, InfoRow, Field, ContactForm, Stat, AvatarPlaceholder, StackedCardCarousel) rather than repeating code on every page.
Design tokens: I used CSS custom properties for colors so that themes (light/dark) could be switched by changing a single set of variables.
Type safety: I defined TypeScript types for data structures such as services, regions, team members, and commodities so that errors are caught by the compiler before the site runs.
Internationalization: I structured all translatable content into JSON locale files (EN, AM, FR, ZH) and used i18next translation keys throughout the codebase.
Version control: I committed my changes in small, logical steps so that the history of the project was clear and any change could be traced or rolled back.
Quality checks: I ran the production build (npm run build) and the linter (npm run lint) regularly and fixed every error or warning before moving on.
Visual verification: I tested the site in the browser at different screen sizes, in both light and dark modes, and in all four languages, including on the mobile menu, to make sure everything was rendered correctly.

2.6 How Good I Was in Performing My Work Tasks
I performed my tasks with a high level of quality and consistency. Every stage of the project compiled cleanly: the TypeScript compiler reported no errors, the linter passed, and the production build succeeded. I verified the site live in the browser across all seven pages, in both themes, and in all four languages, and I fixed issues as they were found rather than leaving them for later. My mentor reviewed my work at each milestone, and the client's feedback was incorporated promptly.

2.7 Challenges I Faced
Inconsistent content across pages: The same information (phone numbers, email, metrics, address) existed in multiple files with different values, which could have confused real customers. I had to carefully compare all the pages and decide on the correct, consistent values.
Dark mode contrast issues: Several parts of the site used hard-coded light colors that stayed blindingly white in dark mode, and some text was invisible because of poor color choices. I had to audit the whole site and introduce theme-aware colors.
Multilingual support complexity: Translating all content into four languages (English, Amharic, French, Chinese) required careful organization of translation keys and ensuring every page component used the translation function correctly. Amharic names, roles, and descriptions needed special attention to ensure accuracy.
Interactive map implementation: Building the Ethiopian coffee map with real geographic coordinates, clickable region pins, and translated descriptions required careful SVG coordinate mapping and state management.
Photo carousel with touch support: Implementing a smooth auto-sliding carousel with drag/swipe support for both mobile and desktop users required handling touch events, mouse events, and preventing conflicts between auto-sliding and user interaction.
Backend API development: Building a complete backend with authentication, database, and API routes required learning Prisma ORM, JWT authentication, and REST API design patterns.
No backend for the contact form: The site originally had no server, so a form that "pretends" to send messages would lose real customer inquiries. I implemented an honest mail-to solution and later built a full backend API.
Search engine and share visibility: The site originally had no share image, no sitemap, and a missing favicon (404 in the browser tab). I created these files and verified they are served correctly.

2.8 Measures I Took to Overcome These Challenges
I made a checklist of every inconsistency, fixed them one by one, and verified each fix in the running site.
I moved duplicated content into single shared data files and shared components, so the same information can no longer drift between pages.
I completed the dark color palette, replaced hard-coded light colors with theme tokens, and checked the site in both modes in the browser.
I structured the i18next translation system with clear key hierarchies (e.g., team.bekure.name, origins.regionNotes.yirgacheffe) to make translations maintainable.
I implemented the photo carousel with a robust event handling system that properly separates touch, mouse, and click events.
I built the backend API step by step, starting with the database schema, then authentication, then CRUD routes, testing each layer before moving to the next.
I ran the build and linter after every batch of changes and reviewed the final result page by page, in every language and theme.

CHAPTER 3: BENEFITS GAINED FROM THE PRACTICAL ATTACHMENT
3.1 Improvement of My Practical Skills
The attachment significantly improved my practical, hands-on skills. I learned to build a complete, production-style website and admin dashboard from scratch — from initializing a Vite project to deploying a production build. I became confident working with React components, props, and state, and I practiced converting a design into responsive, pixel-accurate interfaces with Tailwind CSS. I gained real experience with TypeScript type checking, debugging through the browser developer tools, and running build and lint pipelines. I also practiced working with a real codebase over time: reading existing code, refactoring it, and keeping it clean and maintainable. Additionally, I learned backend development with Node.js, Express.js, Prisma ORM, and JWT authentication.

3.2 Upgrading My Theoretical Knowledge
The attachment connected the theories I learned in class with real practice. I deepened my understanding of single page applications and client-side routing, the component lifecycle, the importance of design systems and design tokens, and how CSS variables enable theming. I also learned about areas rarely covered in class: web accessibility (WCAG contrast standards, ARIA attributes for menus), search engine optimization (Open Graph tags, sitemaps, robots.txt), internationalization with i18next, REST API design, database schema design with Prisma, and web performance concepts such as cumulative layout shift caused by images without dimensions.

3.3 Improving My Interpersonal Communication Skills
Working on a real client project taught me how to communicate with non-technical people. I practiced explaining technical decisions in simple terms, asking clarifying questions instead of guessing, and presenting my work for review. When the client gave feedback such as "the email should be info@bcscoffee.et" or "I want the opening hours to show LT," I learned to confirm the requirement, implement it exactly, and confirm the result.

3.4 Improving My Team Playing Skills
Although I worked primarily on the frontend and backend, I was part of a team and learned how a project moves between people. I coordinated with my mentor for guidance, with the designers for the visual style, and with the project owner for requirements. I learned to share my progress, to ask for help early rather than late, and to hand over work in a state that others can pick up easily.

3.5 Improving My Leadership Skills
Working on the website as my own project taught me to take ownership: to plan the work, break it into steps, prioritize, and see it through to the end without being told what to do at every moment. I practiced making decisions, such as choosing the mail-to approach for the form, structuring the shared data files, implementing the photo carousel architecture, and taking responsibility for the outcomes.

3.6 Understanding Work Ethics
I learned professional work ethics in a real workplace: arriving on time, respecting deadlines, being honest about the state of my work (for example, clearly documenting that the form would not truly send messages until the client provided a service key), keeping client information confidential, and producing work of a quality I would be proud to put my name on. I also learned that "done" means tested, verified, and documented — not just code that happens to compile.

3.7 Entrepreneurship Skills
Observing how the company wins and serves clients, and studying the BCS Coffee business, gave me insight into entrepreneurship. I learned how a business identifies a market need (a coffee consulting and verification service), builds trust through verifiable results, and uses a professional web presence to reach customers in more than 40 countries. I also learned practical lessons about serving a client: meeting a stated need exactly, avoiding promises that cannot be kept, and delivering a handover that lets the client run the product with minimal support.

CHAPTER 4: CONCLUSION AND RECOMMENDATIONS
4.1 Conclusion
My two-month practical attachment at BCS Computer and Finance Solution was a highly valuable experience that allowed me to apply and extend what I learned at university in a real professional environment. BCS Computer and Finance Solution is a comprehensive IT company and training institution that provides a wide range of services from computer training and software development to IT consulting and engineering software courses. Working on the BCS Coffee Market Consulting subsidiary's web application, I experienced the full journey of a client project: understanding requirements, planning the structure, designing a consistent visual system, implementing seven pages with React and TypeScript, building a backend API with Node.js and SQLite, adding themes, implementing four-language internationalization, building a photo carousel with touch support, creating an interactive coffee origins map, adding commodity management with dropdowns, fixing content inconsistencies, improving accessibility and search engine visibility, and verifying quality through builds and linting.
The project also taught me lessons that cannot be learned from textbooks alone: how to communicate with a client, how to handle feedback, how to keep a codebase maintainable through shared components and data files, how to implement multilingual support properly, and how to be honest about the limits of a solution. I leave the attachment with significantly improved practical skills, stronger theoretical understanding, and the confidence to take on real development work.

4.2 Recommendations for the Company
Based on my experience, I offer the following recommendations:
Complete the contact form delivery system. The site's inquiry forms currently open the visitor's email application with a pre-filled message. I recommend the company request a Web3Forms access key from the client and upgrade both forms to a real form service, so that every inquiry is guaranteed to reach the client's inbox even when the visitor has no email application configured.
Wire the social media links. Confirm the deployment domain and deploy. The search engine files (sitemap, robots.txt, and the Open Graph image URL) currently assume the domain bcscoffee.et. The company should confirm the final domain with the client, deploy the production build to a hosting provider, and verify the live site.
Centralize client contact details. Phone numbers, email, and address are currently entered in a few places in the code. I recommend storing them in a single shared data file so that any future change is made in one place.
Keep the content current. Because the site presents real business statistics (exporters, countries, trade volume), the company should review these numbers with the client periodically and update them from the shared data files.
Add a video section in the future. The "From the Field" page currently shows a "videos coming soon" placeholder. When the client produces farm and processing videos, embedding them will make the site significantly more engaging.
Expand the team page. The Our Team page currently has three members. As the company grows, adding more team members with their photos, roles, and social links will strengthen the company's credibility with international buyers.
Consider adding user analytics. The site currently has optional Google Analytics integration. Implementing it would help the client understand which pages and regions get the most interest from international buyers.


REFERENCES
React Documentation. Creating a React App with Vite. https://react.dev
Vite Documentation. Getting Started / Build Tool. https://vitejs.dev
Tailwind CSS Documentation. Utility-First CSS Fundamentals and Theme Configuration (v4). https://tailwindcss.com
React Router Documentation. Routing for React Applications. https://reactrouter.com
i18next Documentation. Internationalization for JavaScript. https://www.i18next.com
Prisma Documentation. Next-generation ORM for Node.js and TypeScript. https://www.prisma.io
Express.js Documentation. Fast, unopinionated, minimalist web framework for Node.js. https://expressjs.com
MDN Web Docs. Accessibility and ARIA. https://developer.mozilla.org
Web Content Accessibility Guidelines (WCAG) 2.1. Contrast (Minimum) Success Criterion 1.4.3. https://www.w3.org/WAI/WCAG21/
Web3Forms Documentation. Form Endpoints and Access Keys. https://web3forms.com
Google Search Central. Sitemaps and robots.txt. https://developers.google.com/search/docs
OpenStreetMap. Interactive Map Embedding. https://www.openstreetmap.org

APPENDICES
Appendix A: Project Folder Structure
client/src/
main.tsx
application entry point
App.tsx
route definitions
index.css
design tokens and global styles
use-theme.ts
dark/light theme hook
assets/
image assets (farms, cherries, ceremony, team photos, etc.)
components/site/
Navbar, Footer, Layout, ContactForm, InfoRow, Field, EthiopianCoffeeMap, StackedCardCarousel, LanguageSelector
admin/
AdminLayout, LoginPage, DashboardPage, CommoditiesPage, ContactsPage, ContentPage, SettingsPage
data/
services.ts, regions.ts (single source of content)
routes/
index, about, services, origins, field, team, contact, not-found
i18n/
index.ts (i18next configuration)
locales/
en.json, am.json, fr.json, zh.json
lib/
api.ts (API client for backend communication)

client/public/
favicon.svg
site icon
og-image.jpg
social share image
robots.txt
crawler rules
sitemap.xml
search engine sitemap

server/src/
index.ts
application entry point
db.ts
Prisma client instance
routes/admin/
auth.ts, commodities.ts, contacts.ts, content.ts, settings.ts
routes/public/
commodities.ts, contact.ts
middleware/
auth.ts (JWT authentication)

server/prisma/
schema.prisma
database schema (Admin, CoffeeCommodity, ContactSubmission, SiteContent, SiteSetting)


Appendix B: Build and Run Commands
Frontend:
npm install — install dependencies
npm run dev — start the development server
npm run build — type-check and create the production build in dist/
npm run lint — run ESLint on the codebase
npm run preview — preview the production build locally

Backend:
npm install — install dependencies
npx prisma generate — generate Prisma client
npx prisma db push — push schema to database
npm run db:seed — seed initial data
npm run dev — start the API server on port 3001


Appendix C: Summary of Completed Work
#
Work item
Status
1
Seven-page site structure with routing
Done
2
Homepage with hero, photo carousel, about, services, regions, testimonials, contact
Done
3
About, Services, Origins, From the Field, Our Team, Contact pages
Done
4
Dark/light mode with persistence, no flash on load, Settings toggle
Done
5
Four-language internationalization (EN, AM, FR, ZH)
Done
6
Phone numbers, email, address, and metrics unified site-wide
Done
7
Shared data files and components (no duplicate content)
Done
8
Photo carousel with auto-slide, drag/swipe, and dot indicators
Done
9
Our Team page with profile photos, social links, and translations
Done
10
Commodity management with dropdowns (source, grade, type, status, processing)
Done
11
Price display in ETB (Ethiopian Birr)
Done
12
Opening hours with LT indicators on contact page
Done
13
Get Directions links on contact page and homepage map
Done
14
Admin dashboard with authentication, commodities, contacts, CMS, settings
Done
15
Backend API with Node.js, Express, Prisma, SQLite, JWT auth
Done
16
Contact forms with mail-to delivery (upgrade-ready)
Done
17
SEO: meta tags, og:image, robots.txt, sitemap.xml, favicon
Done
18
Accessibility: contrast, aria-expanded, image dimensions
Done
19
Footer with "Designed & Developed by Tsion Tesfaye" LinkedIn link
Done
20
Production build and lint passing clean
Done
