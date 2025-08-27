---
sidebar_position: 1
---

# Research Engineering Learning Path

*A Beginner-Friendly Guide for Citizen Researchers at Average Joes Lab*

---

## 1. Introduction

**Research Engineering** is about taking ideas from research papers or new scientific concepts and turning them into something that works: code, experiments, and reproducible results.

### What We Believe at Average Joes Lab (AJL)

- 🎓 **No credentials required** - You don't need a degree to contribute to science
- 🔥 **Just bring curiosity** - Persistence and the right guidance are all you need
- 🛠️ **Structure matters** - This Learning Path gives you structure, resources, and projects to start from zero

### Starting Assumptions

| What We Assume | Status |
|---|---|
| You don't know programming | ❌ That's fine! |
| You don't know math or statistics | ❌ We'll cover basics! |
| You've never read a research paper | ❌ We'll teach you! |
| You're curious and willing to learn | ✅ **This is essential!** |

### Your Journey

**From:** "What is a variable?"  
**To:** "I published my first open-source research project!"

### 🎯 Realistic Expectations

> ⚠️ **Important Note on Reproducibility**  
> Not all famous papers can realistically be trained from scratch by beginners (many require massive datasets and hardware). That's okay!

In this path, we carefully select **popular, beginner-friendly papers** and explain **exactly what you should do**:

| Paper Type | What You'll Do | Examples |
|---|---|---|
| 🟢 **Train from scratch** | Small datasets, quick training | LeNet on MNIST |
| 🟡 **Fine-tune** | Use pretrained model, adapt to new task | DistilBERT sentiment |
| 🔵 **Run inference** | Use existing model to generate outputs | GPT-2 text generation |

This way you don't get stuck trying to do something unreasonable — and you still learn the core concepts!

------------------------------------------------------------------------

## 🚀 Quick Start (Your First 30 Minutes)

> **Feeling overwhelmed?** Start here for immediate wins!

### Step 1: Get Your First Victory (5 minutes) 🏆

1. **Open** [Google Colab](https://colab.research.google.com/) (no installation needed)
2. **Create** a new notebook
3. **Type:** `print("Hello Average Joes Lab! I'm starting my research journey!")`
4. **Press** Shift+Enter to run
5. **🎉 Congratulations!** You just ran your first research code

### Step 2: Join the Community (10 minutes) 👥

1. **Join** our [Discord Server](https://discord.gg/averagejoeslab)
2. **Introduce** yourself in `#introductions`
3. **Ask** questions in `#beginners-help`
4. **🎉 You're now part of the research community!**

### Step 3: Read Your First Paper Abstract (15 minutes) 📚

1. **Go to** [Papers With Code](https://paperswithcode.com/)
2. **Search** for "LeNet MNIST"
3. **Read** just the abstract (first paragraph)
4. **Try to identify:** What problem? What solution? What result?
5. **🎉 You just analyzed research!**

---

**🚀 Feeling confident?** Continue with the full learning path below.  
**😰 Still nervous?** Repeat these steps until comfortable, then proceed.

------------------------------------------------------------------------

## 💻 Hardware & Cost Requirements

### Minimum Requirements (Free Tier) 💰

| Component | Requirement | Notes |
|---|---|---|
| **Computer** | Any laptop/desktop with internet | Even old machines work! |
| **RAM** | 4GB minimum (8GB recommended) | For local development |
| **Storage** | 5GB free space | For downloads and projects |
| **Internet** | Stable connection | For cloud computing |

### Cloud Computing (Recommended - FREE) ☁️

| Platform | What You Get | Limits |
|---|---|---|
| **Google Colab** | Free GPU access | 12-hour sessions |
| **Kaggle Notebooks** | Free GPU/TPU | 30 hours/week |
| **Hugging Face Spaces** | Free model hosting | Community tier |

### Cost Breakdown 💸

| Phase | Cost | What's Included |
|---|---|---|
| **Phase 1-2** | **$0** | Everything free |
| **Phase 3-4** | **$0-20/month** | Optional Colab Pro for longer sessions |
| **Total (16 weeks)** | **$0-80** | Completely optional |

### What You DON'T Need ❌

- 🚫 **Expensive GPU** ($1000+ graphics cards)
- 🚫 **Powerful desktop computer**
- 🚫 **University access or credentials**
- 🚫 **Paid software licenses**

> 💡 **Bottom line:** You can complete this entire learning path for **$0**!

------------------------------------------------------------------------

## 2. Prerequisites (Zero Knowledge Start)

> **Time Investment:** 2-8 weeks depending on your pace and background

### Learning Strategy 📋

| Priority | Skills | Description |
|---|---|---|
| ✅ **Essential** | A, B, C, F | Must complete before Phase 1 |
| 🔄 **Helpful** | D, E | Can learn alongside main phases |

**📚 Study Plan:** 1-2 hours/day, 3-5 days/week

> Every concept has **two free resources** to learn from and an **example practice task**

### A. Programming (Python) ✅ ESSENTIAL

**⏱️ Time Needed:** 1-3 weeks (10-30 hours total)

#### What is Python?
Python is a programming language used to tell computers what to do. It's simple, powerful, and the standard for AI/ML.

#### Learning Resources 📚
- **[Python for Everybody - FreeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)**
- **[Python.org Beginner's Guide](https://wiki.python.org/moin/BeginnersGuide/NonProgrammers)**

#### Practice Task 📝
Write a Python program that prints: `Hello Average Joes Lab!`

#### ✅ Success Criteria (You're Ready When You Can)
- ✓ Create variables and use basic data types (strings, numbers, lists)
- ✓ Write simple functions and use if/else statements
- ✓ Use loops (for/while) to repeat actions
- ✓ Install and import Python libraries (like `numpy`)
- ✓ Debug simple errors by reading error messages

#### 🆘 Stuck? Common Issues
| Problem | Solution |
|---|---|
| "Python not installed" | Use Google Colab instead (no installation needed) |
| "Syntax errors" | Check for missing colons `:` and proper indentation |
| "Can't understand concepts" | Focus on practice, not theory. Code along with tutorials |

------------------------------------------------------------------------

### B. Jupyter Notebooks ✅ ESSENTIAL

**⏱️ Time Needed:** 2-5 hours

#### What is Jupyter?
Jupyter lets you write code, run it, and explain it all in one place. It's the standard tool for reproducible research.

#### Learning Resources 📚
- **[Jupyter Docs - Try Jupyter](https://jupyter.org/try)**
- **[Jupyter Notebook Tutorial - FreeCodeCamp](https://www.youtube.com/watch?v=HW29067qVWk)**

#### Practice Task 📝
Open a Jupyter Notebook and write code that adds 2 + 2.

#### ✅ Success Criteria
- ✓ Create and run code cells in Jupyter/Colab
- ✓ Add markdown cells with text and explanations
- ✓ Save and share notebooks
- ✓ Install libraries within notebooks (`!pip install`)

#### 🆘 Stuck? Common Issues
| Problem | Solution |
|---|---|
| "Can't install Jupyter" | Use Google Colab (jupyter.org/try) |
| "Cells won't run" | Check if you're in edit mode vs command mode |
| "Lost my work" | Always save frequently (Ctrl+S) |

------------------------------------------------------------------------

### C. Git & Version Control ✅ ESSENTIAL

**⏱️ Time Needed:** 1 week (5-10 hours total)

**What is Git?**
Git tracks changes to your code so you can collaborate, backup, and share your research projects.

-   Learn: [GitHub Hello World Guide](https://docs.github.com/en/get-started/quickstart/hello-world)
-   Learn: [Git Handbook](https://guides.github.com/introduction/git-handbook/)

**Practice Task:**
Create a GitHub account, make a repository, and upload your first Python script.

**✅ Success Criteria:**
- Create GitHub account and repositories
- Clone, commit, and push code changes
- Understand basic workflow: edit → add → commit → push
- Fork repositories and make pull requests

**🆘 Stuck? Common Issues:**
- **"Git commands confusing"** → Use GitHub Desktop (visual interface)
- **"Authentication errors"** → Set up SSH keys or use personal access tokens
- **"Merge conflicts"** → Start with simple solo projects first

------------------------------------------------------------------------

### D. Math & Statistics 🔄 HELPFUL

**⏱️ Time Needed:** 2-4 weeks (can learn alongside other skills)

**What is Statistics?**
Statistics helps us describe and analyze data.

-   Learn: [Khan Academy: Statistics &
    Probability](https://www.khanaclademy.org/math/statistics-probability)
-   Learn: [Crash Course Statistics (YouTube
    Playlist)](https://www.youtube.com/playlist?list=PL8dPuuaLjXtOfse2ncvffeelTrqvHR8kE)

**What is Linear Algebra?**
Linear algebra is math for working with vectors (lists of numbers) and
matrices (tables of numbers).

-   Learn: [Khan Academy Linear
    Algebra](https://www.khanacademy.org/math/linear-algebra)
-   Learn: [3Blue1Brown: Essence of Linear
    Algebra](https://www.3blue1brown.com/topics/linear-algebra)

**Practice Task:**
- Calculate mean and variance of a dataset (e.g., student scores).
- Represent images as matrices and understand that each pixel is a
number.

**✅ Success Criteria:**
- Understand mean, median, variance, standard deviation
- Know what vectors and matrices are conceptually
- Recognize overfitting vs underfitting in graphs
- Calculate basic probabilities

**💡 Beginner Tip:** Don't get stuck on complex math. Focus on intuition first, formal proofs later.

------------------------------------------------------------------------

### E. Machine Learning Basics 🔄 HELPFUL

**⏱️ Time Needed:** 2-3 weeks (can learn alongside other skills)

**What is Machine Learning?**
Machine learning is teaching computers to learn patterns from data
instead of being programmed with rules.

-   Learn: [Google's ML Crash
    Course](https://developers.google.com/machine-learning/crash-course)
-   Learn: [fast.ai Practical Deep Learning](https://course.fast.ai/)

**What is Overfitting?**
Overfitting is when a model memorizes the training data instead of
generalizing.

-   Learn: [Overfitting Explained
    Simply](https://towardsdatascience.com/underfitting-and-overfitting-2f9f1f77f7a9)
-   Learn: [Supervised vs Unsupervised --
    GeeksforGeeks](https://www.geeksforgeeks.org/difference-between-supervised-and-unsupervised-learning/)

**Practice Task:**
Train a simple linear regression model to predict house prices using a
tutorial.

**✅ Success Criteria:**
- Understand supervised vs unsupervised learning
- Know what training/validation/test sets are
- Recognize overfitting and underfitting
- Run a simple ML model (even if you don't understand all details)

**💡 Beginner Tip:** Don't worry about understanding everything. Focus on running code and seeing results.

------------------------------------------------------------------------

### F. Research Mindset ✅ ESSENTIAL

**⏱️ Time Needed:** 1 week (5-8 hours total)

**What is the Scientific Method?**
The scientific method is testing ideas with experiments.

-   Learn: [Khan Academy -- Scientific
    Method](https://www.khanacademy.org/test-prep/mcat/scientific-inquiry/scientific-method-mcat/a/the-scientific-method-and-experimental-design)
-   Learn: [Science Buddies --
    Hypotheses](https://www.sciencebuddies.org/science-fair-projects/science-fair/hypothesis)

**What is a Research Paper?**
A paper is a report that explains a scientific question, method, and
results.

-   Learn: [MIT Libraries -- Primary vs Secondary
    Sources](https://libraries.mit.edu/distinctive-collections/research-guide/primary-vs-secondary/)
-   Learn: [How to Read a Paper
    (Keshav)](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf)

**Practice Task:**
Read an abstract of a paper and identify: problem, method, result.

**✅ Success Criteria:**
- Understand hypothesis → experiment → conclusion workflow
- Read and summarize research paper abstracts
- Distinguish between correlation and causation
- Ask good research questions

**🆘 Stuck? Common Issues:**
- **"Papers too complex"** → Start with abstracts only, then conclusions
- **"Don't understand jargon"** → Focus on the big picture first
- **"Feeling overwhelmed"** → Remember: even experts don't understand everything initially

------------------------------------------------------------------------

## 🎯 Prerequisites Checkpoint

### Ready for Phase 1? Check These Off! ✓

| Skill | Can You Do This? |
|---|---|
| **Python Programming** | ✅ Write basic Python programs and use Jupyter notebooks |
| **Version Control** | ✅ Create GitHub repositories and commit code |
| **Research Reading** | ✅ Read research paper abstracts and identify key components |
| **Growth Mindset** | ✅ Understand that you don't need to know everything to start contributing |

---

**⏱️ Estimated Total Time:** 4-12 weeks (depending on your pace and background)

> **🚀 Ready to continue?** Great!  
> **📚 Still working on prerequisites?** That's totally normal - take your time.

------------------------------------------------------------------------

## 3. The Learning Path Framework

> This Learning Path is divided into **4 phases (16 weeks suggested)**

### What Each Phase Includes 📋

| Component | Description |
|---|---|
| **🧠 Concepts** | What you should learn |
| **🛠️ Skills** | What you should be able to do |
| **📝 Deliverables** | What you must produce |
| **📚 Example Papers** | Famous, beginner-friendly, reproducible with clear instructions |

------------------------------------------------------------------------

### Phase 1: Research Foundations (Weeks 1-4)

| 📊 Phase Overview | Details |
|---|---|
| **⏱️ Time Commitment** | 3-5 hours/week |
| **🎯 Goal** | Understand how research works and read your first papers |
| **👥 Community** | Join `#phase1-foundations` channel in Discord |

#### Week 1-2: Research Literacy 📚

**🧠 Concepts:**
- Scientific method, reproducibility, ethics
- How to find papers (arXiv, Google Scholar, Papers With Code)

**🛠️ Skills:**
- Navigate research databases
- Read and summarize paper abstracts
- Identify research questions and methodologies

#### Week 3-4: Literature Analysis 🔍

**🛠️ Skills:**
- Read full research papers (start with conclusions and figures)
- Write structured paper summaries
- Compare different approaches to the same problem

#### 📋 Deliverables

| Checkpoint | Task | Where to Share |
|---|---|---|
| **Week 2** | Summarize 3 paper abstracts | Post in Discord for feedback |
| **Week 4** | Literature review of 3-5 papers (1-2 pages) | GitHub repository |

**📚 Beginner-Friendly Papers:**
1. **LeNet (1998)** -- Digit recognition on MNIST
([Paper](https://paperswithcode.com/paper/gradient-based-learning-applied-to-document-recognition))
- ✅ Trainable from scratch on MNIST (runs in 10-15 minutes on Colab)
- Great "first research reproduction"
- **Why start here:** Simple, foundational, still relevant

2. **AlexNet (2012)** -- ImageNet classification
([Paper](https://paperswithcode.com/paper/imagenet-classification-with-deep-convolutional-neural-networks))
- ⚠️ ImageNet is too large for beginners. Instead: **use pretrained AlexNet** from PyTorch and run inference on sample images
- **Why important:** Sparked the deep learning revolution

**🆘 Getting Stuck?**
- **"Papers too hard"** → Read conclusions first, then introduction, skip math initially
- **"Don't know what to write"** → Use template: Problem → Method → Results → Why it matters
- **"Feeling isolated"** → Share progress in Discord, ask questions, celebrate small wins

------------------------------------------------------------------------

### Phase 2: Technical Skills (Weeks 5--8)

**⏱️ Time Commitment:** 4-6 hours/week  
**🎯 Goal:** Learn to run and modify research code  
**👥 Community:** Join #phase2-technical channel in Discord  

**Week 5-6: Development Environment**
**Concepts:**
- GitHub workflow, Jupyter notebooks, cloud computing
- PyTorch basics, data loading, model training

**Skills:**
- Clone repos, commit changes, push code
- Run existing research notebooks
- Modify hyperparameters and see effects

**Week 7-8: Model Training**
**Concepts:**
- Training loops, loss functions, evaluation metrics
- Experiment tracking with W&B

**Skills:**
- Train models from scratch on small datasets
- Fine-tune pretrained models
- Track and compare experiments

**📋 Deliverables:**
- ✅ **Week 6 Checkpoint:** Fork a research repo, run it, make one modification (post screenshot in Discord)
- ✅ **Week 8 Final:** Reproduce results from one paper + publish your notebook on GitHub

**📚 Beginner-Friendly Papers:**
1. **ResNet (2015)** -- Residual networks
([Paper](https://paperswithcode.com/paper/deep-residual-learning-for-image-recognition))
- ⚠️ ImageNet training is too large. Instead: **train ResNet on CIFAR-10** (small dataset, runs on Colab in 30-45 minutes)
- **Starter code:** [PyTorch CIFAR-10 Tutorial](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html)

2. **DistilBERT (2019)** -- Lightweight NLP model
([Paper](https://paperswithcode.com/paper/distilbert-a-distilled-version-of-bert))
- ✅ Fine-tune on IMDB sentiment dataset in under an hour on Colab
- **Starter code:** [Hugging Face Fine-tuning Tutorial](https://huggingface.co/docs/transformers/training)

**🆘 Getting Stuck?**
- **"Code won't run"** → Check Python/library versions, use exact environment from tutorial
- **"Out of memory errors"** → Reduce batch size, use smaller models, restart Colab session
- **"Results don't match paper"** → That's normal! Focus on getting *something* to work first

------------------------------------------------------------------------

### Phase 3: Research Practice (Weeks 9--12)

**Concepts:**
- Hypotheses, experimental design, dataset usage, evaluation metrics.

**Skills:**
- Write research proposals.
- Design controlled experiments.
- Evaluate models.

**Deliverables:**
- Research proposal (1--2 pages).
- Complete an experiment with results in GitHub repo.

**Beginner-Friendly Papers:**
1. **Simple CNN on CIFAR-10** -- Reproduce baseline CNN performance.
Many tutorials exist.
2. **BERT (2018)**
([Paper](https://paperswithcode.com/paper/bert-pre-training-of-deep-bidirectional))
- ⚠️ Full BERT training is impossible for beginners. Instead:
**fine-tune pretrained BERT** on a small dataset (SST-2 or IMDB).

------------------------------------------------------------------------

### Phase 4: Community Contribution (Weeks 13--16)

**Concepts:**
- Open science, peer review, arXiv, Zenodo.

**Skills:**
- Publish repos.
- Write tutorials/blogs.
- Mentor others.

**Deliverables:**
- Publish research repo.
- Write blog/tutorial.
- Present in AJL Discord.

**Beginner-Friendly Papers:**
1. **GPT-2 (2019)**
([Paper](https://paperswithcode.com/paper/language-models-are-unsupervised-multitask))
- ⚠️ Full GPT-2 training is huge. Instead: **use small GPT-2 models**
(117M) from Hugging Face to generate text.
2. **Stable Diffusion (2022)**
([Paper](https://paperswithcode.com/paper/high-resolution-image-synthesis-with-latent))
- ⚠️ Full training requires heavy GPUs. Instead: **run inference with
pretrained Stable Diffusion models** on Colab.

------------------------------------------------------------------------

## 4. Tools You'll Use

Here are the tools to practice with (not just learn about):

-   **GitHub** -- [GitHub](https://github.com/) -- version control &
    collaboration.
    -   Learn: [GitHub Hello World
        Guide](https://docs.github.com/en/get-started/quickstart/hello-world)
    -   Learn: [Atlassian Git
        Tutorial](https://www.atlassian.com/git/tutorials)
-   **Jupyter** -- [Jupyter](https://jupyter.org/) -- coding +
    documentation.
    -   Learn: [Jupyter Docs](https://docs.jupyter.org/en/latest/)
    -   Learn: [FreeCodeCamp
        Tutorial](https://www.youtube.com/watch?v=HW29067qVWk)
-   **PyTorch** -- [PyTorch](https://pytorch.org/) -- ML framework.
    -   Learn: [PyTorch
        Quickstart](https://pytorch.org/tutorials/beginner/basics/intro.html)
    -   Learn: [Learn PyTorch for Deep Learning --
        FreeCodeCamp](https://www.youtube.com/watch?v=V_xro1bcAuA)
-   **Hugging Face** -- [Hugging Face Hub](https://huggingface.co/) --
    models & datasets.
    -   Learn: [HF Course](https://huggingface.co/course/chapter1)
    -   Learn: [Intro
        Tutorial](https://huggingface.co/docs/transformers/index)
-   **Weights & Biases (W&B)** -- [W&B](https://wandb.ai/site) --
    experiment tracking.
    -   Learn: [Quickstart Guide](https://docs.wandb.ai/quickstart)
    -   Learn: [W&B Intro
        Video](https://www.youtube.com/watch?v=4qUXcX9v8Zc)
-   **Google Colab** -- [Colab](https://colab.research.google.com/) --
    free cloud notebooks.
    -   Learn: [Colab
        Overview](https://research.google.com/colaboratory/)
    -   Learn: [Colab Tutorial -- Towards Data
        Science](https://towardsdatascience.com/getting-started-with-google-colab-f2fff97f594c)
-   **Kaggle** -- [Kaggle](https://www.kaggle.com/) -- datasets + free
    GPUs.
    -   Learn: [Kaggle Learn -- Free
        Courses](https://www.kaggle.com/learn)
    -   Learn: [Kaggle Getting Started](https://www.kaggle.com/docs)
-   **Zenodo** -- [Zenodo](https://zenodo.org/) -- research archiving.
-   **arXiv** -- [arXiv](https://arxiv.org/) -- preprint publishing.

------------------------------------------------------------------------

## 5. Next Steps Checklist

### Your Action Plan 📋

| Step | Task | Phase |
|---|---|---|
| 1 | Join the [AJL Discord](https://discord.gg/averagejoeslab) | Quick Start |
| 2 | Install Python and Jupyter | Prerequisites |
| 3 | Run your first notebook: `print("Hello AJL!")` | Prerequisites |
| 4 | Read LeNet and AlexNet papers | Phase 1 |
| 5 | Write your first literature review | Phase 1 |
| 6 | Fork the AJL starter repo on GitHub | Phase 2 |
| 7 | Reproduce ResNet on CIFAR-10 or fine-tune DistilBERT | Phase 2 |
| 8 | Write your first research proposal | Phase 3 |
| 9 | Publish your experiment repo | Phase 3 |
| 10 | Share in Discord & mentor a newcomer | Phase 4 |

---

### 🔥 By Completing This Learning Path, You'll Have:

| Achievement | Description |
|---|---|
| **📁 Portfolio** | 3-5 real research projects |
| **👥 Network** | Collaborators and mentors |
| **💼 Career Skills** | Research engineer ready for industry, open science, or independent work |

------------------------------------------------------------------------

## 🆘 Troubleshooting & FAQ

### "I'm stuck and don't know what to do next" 😕

| Step | Action |
|---|---|
| 1 | **Check Discord channels** - others might have the same issue |
| 2 | **Post your specific error** with screenshots in `#help-debugging` |
| 3 | **Try the "rubber duck" method** - explain your problem out loud |
| 4 | **Take a break** - sometimes stepping away helps |

### "The code doesn't work / I get errors" 🚫

#### Common Solutions (Try These First!) 🔧

| Problem Type | Solution | Success Rate |
|---|---|---|
| **Any error** | Restart your notebook/Colab session | 50% |
| **Import errors** | Check library versions with `!pip list` | 30% |
| **Getting help** | Copy error messages exactly when asking | 90% |
| **Colab issues** | Try a different browser | 20% |
| **Connection issues** | Check your internet connection | 15% |

### **"I don't understand the math/theory"**
**That's totally normal!** 
- **Focus on running code first**, understanding comes later
- **Skip the math sections** initially, come back to them later
- **Use analogies** - "neural networks are like..." 
- **Ask "what does this do?"** instead of "how does this work?"

### **"I'm falling behind the timeline"**
**The timeline is just a suggestion!**
- **Go at your own pace** - some people need more time
- **Focus on understanding** over speed
- **It's better to do fewer things well** than many things poorly
- **Real learning takes time** - be patient with yourself

### **"I feel like I'm not smart enough"**
**Imposter syndrome is real and common:**
- **Everyone feels this way** when learning new things
- **You don't need to be a genius** to contribute to research
- **Small contributions matter** - not everything needs to be groundbreaking
- **The community is here to help** - you're not alone

### **"I can't afford paid resources"**
**Everything essential is free:**
- **Use Google Colab** instead of buying GPUs
- **All learning resources listed are free**
- **Community support is free**
- **Open source tools only**

### **"I want to specialize in [specific area]"**
**After completing the basics:**
- **Computer Vision:** Focus on CNN papers, image datasets
- **Natural Language Processing:** Focus on transformer papers, text datasets  
- **Reinforcement Learning:** Focus on game/robotics papers
- **Ask in Discord** for specific guidance in your area

### **Emergency Contacts**
- **Technical Issues:** #help-debugging channel
- **Learning Support:** #study-groups channel  
- **Mental Health:** Take breaks, talk to friends, consider professional help if needed
- **Community Guidelines:** #community-rules channel

**Remember:** Every expert was once a beginner. You've got this! 🚀

------------------------------------------------------------------------

## 📞 Community & Support

### Discord Channels 💬

| Channel | Purpose | Who Should Join |
|---|---|---|
| **`#introductions`** | Introduce yourself to the community | Everyone |
| **`#beginners-help`** | Ask any question, no matter how basic | New learners |
| **`#phase1-foundations`** | Phase 1 participants and discussions | Phase 1 students |
| **`#phase2-technical`** | Phase 2 participants and code help | Phase 2 students |
| **`#phase3-research`** | Phase 3 participants and project discussions | Phase 3 students |
| **`#phase4-community`** | Phase 4 participants and mentorship | Phase 4 students |
| **`#success-stories`** | Share your wins, big and small! | Everyone |
| **`#study-groups`** | Find study partners and accountability buddies | Everyone |

### Getting Help 🙋‍♂️

| Step | Best Practice | Why It Works |
|---|---|---|
| 1 | **Search Discord history** | Your question might be answered already |
| 2 | **Be specific** | "When I run X, I get error Y" vs "X doesn't work" |
| 3 | **Share code/screenshots** | Helps others help you faster |
| 4 | **Help others** | Teaching reinforces your own learning |

### Office Hours 🕰️

| Day | Time | Focus |
|---|---|---|
| **Sunday** | 2PM EST | Weekly community calls |
| **Wednesday** | 7PM EST | Beginner Q&A sessions |
| **Friday** | 6PM EST | Technical deep-dives |

---

> **Join us - research is better together!** 🤝