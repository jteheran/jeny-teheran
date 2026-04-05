---
title: "Why I Build: Architecture, Engineering, and Security Operations"
date: "2026-03-27T12:00:00-05:00"
tags: ["Autonomous SOC", "Security Operations", "AI in the SOC", "Detection Engineering", "Eyes on the Glass"]
excerpt: "When I wanted to contribute to the conversation about AI in the SOC, I didn't write a think piece. I built something."
---

# Why I Build: Architecture, Engineering, and Security Operations

I've spent my career at the intersection of architecture, software engineering, and security operations. That combination of backgrounds shapes how I see problems: deconstructing first, understanding the fundamentals next. When I wanted to contribute to the conversation about AI in the SOC, I didn't write a think piece. I built something.

[Eyes on the Glass](https://eyesontheglass.ai) (EOTG) is a public research journal on autonomous security operations. Three AI agents: TORA, VERA, and NOVA run shifts, triage alerts, investigate incidents, and publish what they find. A fourth, ARIA, is coming online. I publish my observer assessment alongside them. The site documents where the agents succeed and where they break down.

This is my contribution to a discussion I've been part of for a long time. Here's what I'm bringing to it.

## The thing I'm most interested in: the workforce pipeline

Playbooks and SOPs exist for good reasons. They ensure consistency. They guarantee the minimum set of steps gets executed for triage, escalation, investigation. That's valuable, especially at scale.

But playbooks and SOPs are floors, not ceilings. Analysts who repeat the same steps without understanding why those steps matter don't become better analysts over time. The knowledge that makes someone a strong investigator: pattern recognition, context built across hundreds of cases, the instinct to know when the playbook doesn't fit. That knowledge doesn't live in a procedure document. It lives in accumulated context. In the memory of what this asset did last week, what this user account looked like three shifts ago, what this malware family did the last time it showed up in this environment. In my most recent role as SOC manager, I spent years fighting tribal knowledge: breaking down silos, building structures to make operational context visible and shared. Playbooks were part of that work. But a playbook captures the minimum. What I kept running into was the gap between what the procedure said and what an experienced analyst actually knew and how little of that knowledge survived a team transition, a reorganization, or simply the end of a shift.

An autonomous SOC, done right, is a knowledge infrastructure. Not a replacement for analysts, but as infrastructure for them. The agents accumulate context across shifts. That context is available to the next analyst, the next investigation, the next escalation. It makes entry-level analysts more capable faster. It makes experienced investigators more effective. And it raises a question I think the industry is badly underinvesting in: where does the loop that informs the business actually live? SOCs generate intelligence every single day. Almost none of it travels upstream. That's the problem I'm most interested in.

## The data pipeline question nobody is answering concretely

Before AI does anything meaningful in a SOC, the environment has to be ready for it. Not perfectly ready, I don't believe you have to solve everything before AI adds value. But you have to be honest about where you are. Deploying AI agents isn't going to fix incomplete data pipelines, inconsistent asset context and alert taxonomies that don't reflect the actual threat picture. What AI can do is expose those gaps faster than any audit ever did, because it keeps running into them and logging what it can't find.

EOTG is my vehicle for figuring out what the data pipeline for an effective autonomous SOC actually needs to look like. Not in theory. In practice, shift by shift, with the failures published alongside the findings.

## A CI/CD of automation

An autonomous SOC with the right foundations and the right AI layer isn't running static playbooks against a static threat picture. It enables faster automation and enhances detection engineering, threat intelligence, and threat hunting. It's iterating. Every shift is a feedback loop. Detection logic improves. Threat intelligence gets operationalized faster. The gap between "we saw this" and "we're defended against this" gets shorter.

That's not a vendor promise. That's an engineering problem, and it's one I know how to think about.

## Why public

I didn't build this privately because the value of doing it in the open is precisely that the failures are visible. Every gap TORA runs into, every judgment call that turns out to be consistently applied but not correctly applied, every data pipeline assumption that turns out to be wrong, that's the research.

TORA, the triaging agent posted the [first shift summary today](https://eyesontheglass.ai/posts/tora-week-20260327/). 
</br>
[My observer assessment](https://eyesontheglass.ai/posts/observer-week-20260327/) is alongside it. 

The research starts now.
