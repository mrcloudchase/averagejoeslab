---
sidebar_position: 5
---

# 05. Learning Framework (4 Phases)

*Your structured 16-week journey from beginner to research engineer*

---

> This Learning Path is divided into **4 phases (16 weeks suggested)**

## What Each Phase Includes 📋

| Component | Description |
|---|---|
| **🧠 Concepts** | What you should learn |
| **🛠️ Skills** | What you should be able to do |
| **📝 Deliverables** | What you must produce |
| **📚 Example Papers** | Famous, beginner-friendly, reproducible with clear instructions |

---

## Phase 1: Research Foundations (Weeks 1-4)

| 📊 Phase Overview | Details |
|---|---|
| **⏱️ Time Commitment** | 3-5 hours/week |
| **🎯 Goal** | Understand how research works and read your first papers |
| **👥 Community** | Join `#phase1-foundations` channel in Discord |

### Week 1-2: Research Literacy 📚

**🧠 Concepts:**
- Scientific method, reproducibility, ethics
- How to find papers (arXiv, Google Scholar, Papers With Code)

**🛠️ Skills:**
- Navigate research databases
- Read and summarize paper abstracts
- Identify research questions and methodologies

### Week 3-4: Literature Analysis 🔍

**🛠️ Skills:**
- Read full research papers (start with conclusions and figures)
- Write structured paper summaries
- Compare different approaches to the same problem

### 📋 Deliverables

| Checkpoint | Task | Where to Share |
|---|---|---|
| **Week 2** | Summarize 3 paper abstracts | Post in Discord for feedback |
| **Week 4** | Literature review of 3-5 papers (1-2 pages) | GitHub repository |

### 📚 Beginner-Friendly Papers

1. **LeNet (1998)** -- Digit recognition on MNIST
   - **[Paper Link](https://paperswithcode.com/paper/gradient-based-learning-applied-to-document-recognition)**
   - ✅ Trainable from scratch on MNIST (runs in 10-15 minutes on Colab)
   - Great "first research reproduction"
   - **Why start here:** Simple, foundational, still relevant

2. **AlexNet (2012)** -- ImageNet classification
   - **[Paper Link](https://paperswithcode.com/paper/imagenet-classification-with-deep-convolutional-neural-networks)**
   - ⚠️ ImageNet is too large for beginners. Instead: **use pretrained AlexNet** from PyTorch and run inference on sample images
   - **Why important:** Sparked the deep learning revolution

### 🆘 Getting Stuck?
| Problem | Solution |
|---|---|
| "Papers too hard" | Read conclusions first, then introduction, skip math initially |
| "Don't know what to write" | Use template: Problem → Method → Results → Why it matters |
| "Feeling isolated" | Share progress in Discord, ask questions, celebrate small wins |

---

## Phase 2: Technical Skills (Weeks 5-8)

| 📊 Phase Overview | Details |
|---|---|
| **⏱️ Time Commitment** | 4-6 hours/week |
| **🎯 Goal** | Learn to run and modify research code |
| **👥 Community** | Join `#phase2-technical` channel in Discord |

### Week 5-6: Development Environment 💻

**🧠 Concepts:**
- GitHub workflow, Jupyter notebooks, cloud computing
- PyTorch basics, data loading, model training

**🛠️ Skills:**
- Clone repos, commit changes, push code
- Run existing research notebooks
- Modify hyperparameters and see effects

### Week 7-8: Model Training 🤖

**🧠 Concepts:**
- Training loops, loss functions, evaluation metrics
- Experiment tracking with W&B

**🛠️ Skills:**
- Train models from scratch on small datasets
- Fine-tune pretrained models
- Track and compare experiments

### 📋 Deliverables

| Checkpoint | Task | Where to Share |
|---|---|---|
| **Week 6** | Fork a research repo, run it, make one modification | Post screenshot in Discord |
| **Week 8** | Reproduce results from one paper + publish notebook | GitHub repository |

### 📚 Beginner-Friendly Papers

1. **ResNet (2015)** -- Residual networks
   - **[Paper Link](https://paperswithcode.com/paper/deep-residual-learning-for-image-recognition)**
   - ⚠️ ImageNet training is too large. Instead: **train ResNet on CIFAR-10** (small dataset, runs on Colab in 30-45 minutes)
   - **[Starter Code: PyTorch CIFAR-10 Tutorial](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html)**

2. **DistilBERT (2019)** -- Lightweight NLP model
   - **[Paper Link](https://paperswithcode.com/paper/distilbert-a-distilled-version-of-bert)**
   - ✅ Fine-tune on IMDB sentiment dataset in under an hour on Colab
   - **[Starter Code: Hugging Face Fine-tuning Tutorial](https://huggingface.co/docs/transformers/training)**

### 🆘 Getting Stuck?
| Problem | Solution |
|---|---|
| "Code won't run" | Check Python/library versions, use exact environment from tutorial |
| "Out of memory errors" | Reduce batch size, use smaller models, restart Colab session |
| "Results don't match paper" | That's normal! Focus on getting *something* to work first |

---

## Phase 3: Research Practice (Weeks 9-12)

| 📊 Phase Overview | Details |
|---|---|
| **⏱️ Time Commitment** | 5-7 hours/week |
| **🎯 Goal** | Design and conduct your own experiments |
| **👥 Community** | Join `#phase3-research` channel in Discord |

### Week 9-10: Experimental Design 🔬

**🧠 Concepts:**
- Hypotheses, experimental design, dataset usage, evaluation metrics
- Research proposal writing

**🛠️ Skills:**
- Write research proposals
- Design controlled experiments
- Choose appropriate datasets and metrics

### Week 11-12: Research Execution 📊

**🛠️ Skills:**
- Conduct original experiments
- Analyze and interpret results
- Document findings clearly

### 📋 Deliverables

| Checkpoint | Task | Where to Share |
|---|---|---|
| **Week 10** | Research proposal (1-2 pages) | GitHub repository |
| **Week 12** | Complete experiment with results | GitHub repository + Discord |

### 📚 Beginner-Friendly Papers

1. **Simple CNN on CIFAR-10** -- Reproduce baseline CNN performance
   - Many tutorials exist online
   - Focus on understanding the experimental setup

2. **BERT (2018)** -- Bidirectional transformer
   - **[Paper Link](https://paperswithcode.com/paper/bert-pre-training-of-deep-bidirectional)**
   - ⚠️ Full BERT training is impossible for beginners
   - Instead: **fine-tune pretrained BERT** on a small dataset (SST-2 or IMDB)

---

## Phase 4: Community Contribution (Weeks 13-16)

| 📊 Phase Overview | Details |
|---|---|
| **⏱️ Time Commitment** | 4-6 hours/week |
| **🎯 Goal** | Share your work and help others |
| **👥 Community** | Join `#phase4-community` channel in Discord |

### Week 13-14: Publication & Sharing 📢

**🧠 Concepts:**
- Open science, peer review, arXiv, Zenodo
- Technical writing and documentation

**🛠️ Skills:**
- Publish repositories with clear documentation
- Write tutorials and blog posts
- Present findings to community

### Week 15-16: Mentorship & Leadership 👥

**🛠️ Skills:**
- Mentor newcomers in the community
- Lead collaborative projects
- Contribute to open source research tools

### 📋 Deliverables

| Checkpoint | Task | Where to Share |
|---|---|---|
| **Week 14** | Publish research repo with documentation | GitHub + community showcase |
| **Week 16** | Write tutorial/blog + mentor newcomer | Discord + personal blog |

### 📚 Beginner-Friendly Papers

1. **GPT-2 (2019)** -- Language model
   - **[Paper Link](https://paperswithcode.com/paper/language-models-are-unsupervised-multitask)**
   - ⚠️ Full GPT-2 training is huge. Instead: **use small GPT-2 models** (117M) from Hugging Face to generate text

2. **Stable Diffusion (2022)** -- Image generation
   - **[Paper Link](https://paperswithcode.com/paper/high-resolution-image-synthesis-with-latent)**
   - ⚠️ Full training requires heavy GPUs. Instead: **run inference with pretrained Stable Diffusion models** on Colab

---

## 🎯 Phase Progression Tips

### Moving Between Phases
- **Don't rush** - It's better to understand one phase well than to rush through all four
- **Overlap is okay** - You can start the next phase while finishing the previous one
- **Get feedback** - Share your progress in Discord before moving on
- **Build on previous work** - Each phase should build on what you learned before

### Success Metrics
| Phase | You're Ready to Move On When... |
|---|---|
| **Phase 1** | You can read and summarize research papers confidently |
| **Phase 2** | You can reproduce existing research code and make modifications |
| **Phase 3** | You can design and execute your own experiments |
| **Phase 4** | You can share your work and help others learn |

---

**Previous:** [04. Prerequisites](./04-prerequisites.md) | **Next:** [06. Tools & Resources](./06-tools-resources.md)
