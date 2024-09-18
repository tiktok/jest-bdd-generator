---
id: introduction
title: Why Jest-BDD
sidebar_label:  Why Jest-BDD
---
# Why Jest-BDD
There are **two key difference** between **Cucumber** and **Jest**, that make them contradictory in certain aspects:

- **context**
   1. Unit testing with Jest requires every `test()` to be self-contained and independent, or put in another way, context-free.
   1. In the contrast, it is an **anti-pattern** for `Cucumber` to have steps that are scenario-specific. It emphasizes reusing across different scenarios, allowing tests to run in various real-world context.

- **Reusing**
  1. One of the powerful aspects of `Cucumber` and the `BDD` approach is the ability to reuse `step` definitions across multiple scenarios and features, allowing you to cover a wide range of test cases with a relatively small amount of code. This reuse is facilitated by writing generic step definitions that can be parameterized to handle different data and contexts.
  1. On the other hand in unit testing, over-reuse is an **anti-pattern** sometimes referred as Utility-Abuse. It often hides important logic, reduce test readability, and introduces unnecessary coupling between tests.

**Despite these differences, there are key similarities** that make Jest and BDD approaches resonate:

- `Triple-A` pattern and `Gherkin`:
  - Cucumber divides testing code into steps and runs them in sequence by the Scenarios defined.  
  1. Arrange (Given): Establish the context.
  2. Action (When): Simulate actions or events.
  3. Assertion (Then): Verify outcomes against the expected results.

- `Scenario` as a Unit
  - In Gherkin, the `Scenario` is an equivalent concept to Jest's `test()`. Each Scenario represents a single path or example through a feature, describing a particular behavior of the application in a given situation. 
  - Unlike the `steps` in Gherkin, a `Scenario` do not rely on external context or state. This isolation ensures that tests are deterministic, meaning they will produce the same outcome every time they are run if the code hasn't changed. This characteristic is crucial for identifying and troubleshooting issues quickly and accurately.

In other words, combining the best of both Jest and BDD can create a powerful testing framework with broader capabilities and flexibility.


# More about Behaviour-Driven Development (BDD)
[CucumberJS](https://cucumber.io/docs/installation/javascript/) facilitates behavior-driven development by enabling automated acceptance tests written in plain language. The language, called [Gherkin](https://cucumber.io/docs/gherkin/reference/), bridges the gap between developers, QA engineers, and non-technical stakeholders, allowing them to collaborate on how the software should behave. Gherkin’s natural, human-readable format describes features and expected behaviors, ensuring a shared understanding of the system's requirements.
