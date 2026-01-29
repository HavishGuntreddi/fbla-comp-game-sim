export const careers = {
  engineer: {
    title: '💻 Software Engineer',
    color: '#00d9ff',
    scenario: {
      title: 'Welcome to TechCorp!',
      text: 'You\'re a Software Engineer at TechCorp, a leading tech company. Today, you\'re working on a critical feature for the company\'s new mobile app. Your team is counting on you to write clean, efficient code and solve complex problems. The product launch is in two weeks, and every line of code matters!'
    },
    challenge: {
      title: 'Engineering Challenge: Debug & Design',
      questions: [
        {
          question: 'A user reports that the app crashes when they try to upload a profile picture. What\'s your first step?',
          options: [
            'Immediately start rewriting the entire upload module',
            'Check the error logs and reproduce the bug in a test environment',
            'Tell the user to restart their phone',
            'Ignore it since only one user reported it'
          ],
          correct: 1,
          explanation: 'Correct! Checking error logs and reproducing the bug helps you understand the root cause before making changes.'
        },
        {
          question: 'Your team needs to choose a database for storing user data. Which factor is MOST important?',
          options: [
            'The database your friend uses',
            'The one with the coolest logo',
            'Scalability, performance requirements, and data structure needs',
            'The cheapest option available'
          ],
          correct: 2,
          explanation: 'Excellent! Technical decisions should be based on requirements like scalability, performance, and how well the technology fits your needs.'
        },
        {
          question: 'You\'re reviewing a colleague\'s code. What makes for good code review feedback?',
          options: [
            'Just saying "looks good" without reading it',
            'Pointing out every tiny style issue aggressively',
            'Providing constructive suggestions with explanations and alternatives',
            'Rewriting all their code yourself'
          ],
          correct: 2,
          explanation: 'Perfect! Constructive feedback with explanations helps your colleagues learn and improves code quality collaboratively.'
        }
      ]
    },
    skills: [
      '🎯 Problem-solving and debugging complex issues',
      '💡 Writing clean, maintainable code',
      '🤝 Collaborating with cross-functional teams',
      '📚 Continuous learning of new technologies and frameworks',
      '🔍 Code review and quality assurance',
      '⚡ Algorithm design and optimization'
    ]
  },
  nurse: {
    title: '❤️ Registered Nurse',
    color: '#ff006e',
    scenario: {
      title: 'Emergency Room - Night Shift',
      text: 'You\'re a Registered Nurse working the night shift in a busy emergency room. Tonight has been particularly challenging with multiple patients requiring immediate attention. You need to prioritize care, communicate effectively with doctors and families, and maintain composure under pressure. Your decisions directly impact patient outcomes and safety.'
    },
    challenge: {
      title: 'Nursing Challenge: Patient Care & Critical Thinking',
      questions: [
        {
          question: 'You have three patients: Patient A with mild chest pain, Patient B with a broken arm, and Patient C with severe difficulty breathing. Who do you assess first?',
          options: [
            'Patient A - chest pain could be serious',
            'Patient B - broken bones need immediate attention',
            'Patient C - difficulty breathing is life-threatening',
            'Whoever arrived first'
          ],
          correct: 2,
          explanation: 'Correct! Airway and breathing problems are the highest priority in emergency triage. Patient C needs immediate assessment.'
        },
        {
          question: 'A patient\'s family member is angry about wait times and is yelling at you. How do you respond?',
          options: [
            'Yell back to show them you won\'t be disrespected',
            'Ignore them and walk away',
            'Listen calmly, acknowledge their frustration, and explain the situation with empathy',
            'Call security immediately'
          ],
          correct: 2,
          explanation: 'Excellent! Empathetic communication and active listening de-escalate situations and help families feel heard during stressful times.'
        },
        {
          question: 'You notice a medication order that seems unusually high for the patient\'s weight. What do you do?',
          options: [
            'Administer it anyway - the doctor must be right',
            'Question the physician and verify the dosage before administering',
            'Ask another nurse to give it instead',
            'Cut the dose in half on your own'
          ],
          correct: 1,
          explanation: 'Perfect! Patient safety comes first. Always verify questionable orders with the prescribing physician before administration.'
        }
      ]
    },
    skills: [
      '🏥 Patient assessment and clinical judgment',
      '💊 Medication administration and safety protocols',
      '❤️ Compassionate patient care and emotional support',
      '🚨 Emergency response and critical thinking',
      '📋 Detailed documentation and record-keeping',
      '👥 Communication with patients, families, and medical teams'
    ]
  },
  business: {
    title: '📊 Business Analyst',
    color: '#ffbe0b',
    scenario: {
      title: 'Strategic Planning at GlobalCorp',
      text: 'You\'re a Business Analyst at GlobalCorp, tasked with helping the company expand into a new market. Your role involves analyzing data, identifying trends, understanding stakeholder needs, and making recommendations that will impact the company\'s bottom line. Today, you\'re presenting your findings to senior executives who will make final decisions based on your analysis.'
    },
    challenge: {
      title: 'Business Challenge: Analysis & Strategy',
      questions: [
        {
          question: 'Sales data shows a 30% increase in Region A but a 20% decrease in Region B. What\'s your first analytical step?',
          options: [
            'Immediately recommend shutting down Region B',
            'Investigate the underlying factors: market conditions, competition, seasonal trends, and local factors',
            'Focus only on celebrating Region A\'s success',
            'Assume it\'s just bad luck in Region B'
          ],
          correct: 1,
          explanation: 'Excellent! Good analysis looks beyond surface numbers to understand root causes before making recommendations.'
        },
        {
          question: 'Stakeholders are giving you conflicting requirements for a new project. How do you handle this?',
          options: [
            'Choose your favorite stakeholder and ignore the others',
            'Organize a meeting to align stakeholders, document conflicts, and find common ground',
            'Quit the project - it\'s too complicated',
            'Make your own decisions without consulting anyone'
          ],
          correct: 1,
          explanation: 'Perfect! Facilitating stakeholder alignment and documenting requirements is a core BA skill that ensures project success.'
        },
        {
          question: 'Your data analysis reveals an opportunity, but it requires significant investment with uncertain returns. How do you present this?',
          options: [
            'Hide the risks and only show the potential rewards',
            'Present a balanced view: potential benefits, risks, required investment, and multiple scenarios',
            'Tell them not to do it because of the risk',
            'Make the decision for them'
          ],
          correct: 1,
          explanation: 'Correct! Business analysts provide objective analysis with both opportunities and risks, enabling informed decision-making.'
        }
      ]
    },
    skills: [
      '📊 Data analysis and interpretation',
      '💼 Requirements gathering and documentation',
      '🎯 Strategic thinking and problem-solving',
      '📈 Market research and competitive analysis',
      '🤝 Stakeholder management and communication',
      '💡 Process improvement and optimization'
    ]
  },
  lawyer: {
    title: '⚖️ Lawyer',
    color: '#8338ec',
    scenario: {
      title: 'Morrison & Associates Law Firm',
      text: 'You\'re an attorney at Morrison & Associates, a respected law firm. Today, you\'re preparing for a client meeting about a complex business contract dispute. Your job is to analyze legal documents, provide sound counsel, protect your client\'s interests, and navigate the nuances of contract law. Your analytical skills and attention to detail are crucial to achieving a favorable outcome.'
    },
    challenge: {
      title: 'Legal Challenge: Analysis & Reasoning',
      questions: [
        {
          question: 'Your client wants to proceed with an action that\'s technically legal but ethically questionable. What do you do?',
          options: [
            'Do whatever the client wants - they\'re paying you',
            'Refuse to work with them entirely',
            'Explain the legal and ethical implications, advise on risks, and let the client make an informed decision',
            'Report them to the authorities immediately'
          ],
          correct: 2,
          explanation: 'Correct! Lawyers must provide candid advice about legal and ethical implications while respecting client autonomy in decision-making.'
        },
        {
          question: 'You\'re reviewing a 50-page contract and discover an ambiguous clause that could be interpreted multiple ways. What\'s your approach?',
          options: [
            'Skip over it - it\'s probably not important',
            'Assume the best interpretation for your client',
            'Flag it, research case law on similar clauses, and recommend clarifying language to avoid future disputes',
            'Let the other side figure it out'
          ],
          correct: 2,
          explanation: 'Excellent! Identifying ambiguities and proactively addressing them prevents costly disputes and protects your client.'
        },
        {
          question: 'During trial preparation, you find evidence that weakens your case. What\'s your ethical obligation?',
          options: [
            'Hide it and hope the other side doesn\'t find it',
            'Disclose it to opposing counsel per discovery rules and adjust your legal strategy',
            'Destroy the evidence',
            'Lie about it if asked'
          ],
          correct: 1,
          explanation: 'Perfect! Ethical obligations and discovery rules require disclosure. Integrity is fundamental to legal practice.'
        }
      ]
    },
    skills: [
      '⚖️ Legal research and case law analysis',
      '📝 Contract drafting and review',
      '🎯 Critical thinking and logical reasoning',
      '👔 Professional ethics and responsibility',
      '🗣️ Persuasive writing and oral advocacy',
      '🔍 Attention to detail and analytical precision'
    ]
  }
};
