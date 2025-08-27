---
sidebar_position: 1
---

# Research Engineering Learning Path

*A Beginner-Friendly Guide for Citizen Researchers at Average Joes Lab*

------------------------------------------------------------------------

## 1. Introduction

**Research Engineering** is about taking ideas from research papers or
new scientific concepts and turning them into something that works:
code, experiments, and reproducible results.

At **Average Joes Lab (AJL)**, we believe:
- You don't need a degree or credentials to contribute to science.
- You just need curiosity, persistence, and the right guidance.
- This Learning Path gives you **structure, resources, and projects** to
start from zero.

This path assumes:
❌ You don't know programming.
❌ You don't know math or statistics.
❌ You've never read a research paper.
✅ But you're curious and willing to learn.

We'll take you from "What is a variable?" → "I published my first
open-source research project."

⚠️ **Important Note on Reproducibility**: Not all famous papers can
realistically be trained from scratch by beginners (many require massive
datasets and hardware). That's okay. In this path, we carefully select
**popular, beginner-friendly papers** and explain **exactly what you
should do**:
- Some papers you will **train from scratch** (small datasets).
- Some papers you will **fine-tune** a pretrained model.
- Some papers you will only **run inference** (use an existing model to
generate outputs).

This way you don't get stuck trying to do something unreasonable --- and
you still learn the core concepts.

------------------------------------------------------------------------

## 2. Prerequisites (Zero Knowledge Start)

Here's what you'll need to learn before diving into research. Every
concept has **two free resources** to learn from and an **example
practice task**.

### A. Programming (Python)

**What is Python?**
Python is a programming language used to tell computers what to do. It's
simple, powerful, and the standard for AI/ML.

-   Learn: [Python for Everybody --
    FreeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)
-   Learn: [Python.org Beginner's
    Guide](https://wiki.python.org/moin/BeginnersGuide/NonProgrammers)

**Practice Task:**
Write a Python program that prints: `Hello Average Joes Lab!`

------------------------------------------------------------------------

### B. Jupyter Notebooks

**What is Jupyter?**
Jupyter lets you write code, run it, and explain it all in one place.
It's the standard tool for reproducible research.

-   Learn: [Jupyter Docs -- Try Jupyter](https://jupyter.org/try)
-   Learn: [Jupyter Notebook Tutorial --
    FreeCodeCamp](https://www.youtube.com/watch?v=HW29067qVWk)

**Practice Task:**
Open a Jupyter Notebook and write code that adds 2 + 2.

------------------------------------------------------------------------

### C. Math & Statistics

**What is Statistics?**
Statistics helps us describe and analyze data.

-   Learn: [Khan Academy: Statistics &
    Probability](https://www.khanacademy.org/math/statistics-probability)
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

------------------------------------------------------------------------

### D. Machine Learning Basics

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

------------------------------------------------------------------------

### E. Research Mindset

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

------------------------------------------------------------------------

## 3. The Learning Path Framework

This Learning Path is divided into **4 phases (16 weeks suggested)**.

Each phase includes:
- **Concepts** → what you should learn.
- **Skills** → what you should be able to do.
- **Deliverables** → what you must produce.
- **Example Papers** → famous, beginner-friendly, reproducible with
clear instructions.

------------------------------------------------------------------------

### Phase 1: Research Foundations (Weeks 1--4)

**Concepts:**
- Scientific method, reproducibility, ethics.
- How to find papers (arXiv, Google Scholar, Papers With Code).

**Skills:**
- Read and summarize papers.
- Write a short literature review.

**Deliverables:**
- Literature review of 3--5 papers.

**Beginner-Friendly Papers:**
1. **LeNet (1998)** -- Digit recognition on MNIST
([Paper](https://paperswithcode.com/paper/gradient-based-learning-applied-to-document))
- ✅ Trainable from scratch on MNIST (runs in minutes on Colab).
- Great "first research reproduction."
2. **AlexNet (2012)** -- ImageNet classification
([Paper](https://paperswithcode.com/paper/imagenet-classification-with-deep))
- ⚠️ ImageNet is too large for beginners. Instead: **use pretrained
AlexNet** from PyTorch and run inference on sample images.

------------------------------------------------------------------------

### Phase 2: Technical Skills (Weeks 5--8)

**Concepts:**
- GitHub, Jupyter, PyTorch/TensorFlow, Hugging Face, W&B.

**Skills:**
- Clone repos, push code, run notebooks.
- Train and fine-tune models.
- Track experiments.

**Deliverables:**
- Reproduce results from one paper.
- Publish your notebook on GitHub.

**Beginner-Friendly Papers:**
1. **ResNet (2015)** -- Residual networks
([Paper](https://paperswithcode.com/paper/deep-residual-learning-for-image-recognition))
- ⚠️ ImageNet training is too large. Instead: **train ResNet on
CIFAR-10** (a small dataset). This runs on Colab.
2. **DistilBERT (2019)** -- Lightweight NLP model
([Paper](https://paperswithcode.com/paper/distilbert-a-distilled-version-of-bert))
- ✅ Fine-tune on IMDB sentiment dataset in under an hour on Colab. Very
beginner-friendly.

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

1.  Join the [AJL Discord](https://discord.gg/averagejoeslab).
2.  Install Python and Jupyter.
3.  Run your first notebook: `print("Hello AJL!")`
4.  Read LeNet and AlexNet papers (LeNet: train from scratch, AlexNet:
    inference only).
5.  Write your first literature review.
6.  Fork the AJL starter repo on GitHub.
7.  Reproduce ResNet on CIFAR-10 or fine-tune DistilBERT.
8.  Write your first research proposal.
9.  Publish your experiment repo.
10. Share in Discord & mentor a newcomer.

------------------------------------------------------------------------

🔥 By completing this Learning Path, you'll have:
- A **portfolio of 3--5 projects**.
- A **network of collaborators**.
- The skills to be a **research engineer** ready for industry, open
science, or independent work.