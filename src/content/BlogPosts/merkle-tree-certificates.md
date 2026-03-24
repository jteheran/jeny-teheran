---
title: "Merkle Tree Certificates: Chrome’s Path to Quantum-Safe HTTPS"
date: "2026-03-06T12:00:00-05:00"
tags: ["Post-quantum Cryptography", "Quantum-Safe cryptography", "Merkle Tree"]
excerpt: "Post-quantum cryptography solves one problem and creates two others. "
---

# Merkle Tree Certificates: Chrome’s Path to Quantum-Safe HTTPS

2 weeks ago, Google's Chrome Secure Web and Networking Team announced their strategy to make HTTPS quantum safe. How? Using Merkle Tree Certificates (MTCs), which is a cool cryptographic solution and work in progress by IETF's PLANTS (Public Key Infrastructure PKI, Logs and Tree Signatures) working group (Loving the acronym BTW!). 

## So, what does this mean for the TLS stack that protects HTTPS connections?
When you visit any website and you see the padlock followed by HTTPS, there is a brief negotiation called TLS handshake that makes your navigation secure and safe. This is a crucial step to verify the identity of any website you're trying to visit. This is accomplished via a chain of cryptographic digital signatures stamped on small pieces of data called certificates. A valid and verified X.509 chain-of-trust means you're knocking on the right door. 

Today a TLS handshake verifies 3-4 signatures validating from the Root Certificate Authority (CA) down to the website’s certificate. A certificate is a binding of a public key with a server identity and it is issued by a Certificate Authority (CA) that signs it with its private key. A Root CA is a trusted third-party and their certificate is already installed on your browser. That's how your browser knows whether to trust a certificate for any website you try to visit: trust is anchored at the Root CAs. The diagram below illustrates this chain of trust.

![X.509 Chain of Trust: Browser verifies top-down from Root CA to leaf certificate](/images/QuantumSafeHTTPS1.png)

## The cost of going quantum
Post-quantum signature schemes have much larger keys and signatures than classical ones, for example:

| Algorithm                        | Public Key Size | Signature Size      |
|----------------------------------|-----------------|---------------------|
| ECDSA P-256                      | 64 Bytes        | 64 Bytes            |
| ML-DSA (L2)/CRYSTALS-Dilithium   | 1,312 Bytes     | 2,420 Bytes         |
| SLH-DSA-128 / SPHINCS+           | 32 Bytes        | 7,856–17,088 bytes  |
| FN-DSA-512/FALCON-512            | 897 Bytes       | 666 Bytes           |

Note: NIST post-quantum cryptography suite currently has 5 algorithms: ML-DSA, SLH-DSA and FN-DSA are for digital signatures. ML-KEM is for general purpose encryption and HQC was announced last year as backup for ML-KEM. 

Quantum-resistant cryptography makes digital signature become 10-40 times larger, that makes HTTPS bulkier. But larger signatures aren't the only challenge. The X.509 model that underpins HTTPS today also carries a structural auditability problem. Quantum-resistant cryptography makes both issues impossible to ignore at the same time.
In addition to digital signature verification during TLS handshake, quantum-resistant cryptography brings more overhead to Certificate Transparency (CT). CT is the solution to the inherent auditability problem in X.509 PKI: a fraudulent certificate issued by a compromised or misconfigured CA will still get verified through a valid chain of trust. Instead of blindly trusting that CAs behave correctly, CT makes certificate issuance observable. Every certificate is recorded in an append-only log that anyone can monitor and verify.
Today, when a CA issues a certificate and submits it to a CT log, the log returns a Signed Certificate Timestamp (SCT). An SCT is a cryptographic promise that the certificate will be permanently included in the log. This SCT is either embedded in the certificate or delivered during the TLS handshake. And that adds up to the TLS handshake concern getting unmanageable. Modern browsers now require proof that a certificate has been logged before they will trust it. This means that domain owners, researchers, and monitoring systems can detect suspicious or unauthorized certificates in near real time. For example, Chrome requires two SCTs per certificate and with quantum-resistant-sized signatures, that overhead compounds fast.

## Enter Merkle Tree Certificates

Merkle Tree Certificates (MTCs) change how browsers execute TLS handshakes: instead of validating a chain of signatures from certificate authorities, the browser verifies a compact proof showing that the certificate exists inside a public log structured as a Merkle Tree. MTCs are a work-in progress of IETF’s PLANTS working group.  The diagram below illustrates a side-by-side comparison of traditional X.509 PKI vs MTC PKI.  

![X.509 vs MTC side-by-side: X.509 chain of signatures (left) vs Merkle Tree Certificate Structure (right)](/images/QuantumSafeHTTPS2.png)

It is worth mentioning that Merkle Trees were already in use for Certificate Transparency. A Merkle tree is a hash-based commitment to a set of data that allows efficient proofs that any element belongs to that set. Each node in the tree is the hash of its children, and the root hash therefore commits to the entire structure. To prove that a specific element is included, one only needs the hashes along the path from that element to the root. In the context of MTCs, this proof is simply the sequence of hashes connecting the certificate to the signed root of the tree, allowing the browser to verify trust with only a small amount of data.

![MTC inclusion proof: browser receives CertA plus three sibling hashes to verify trust up to the signed Tree Head.](/images/QuantumSafeHTTPS3.png)

Instead of sending multiple large signatures during the TLS handshake, the server sends:
•	A leaf certificate for website.com and,
•	A set of sibling hashes. 
In the diagram above, the set of sibling hashes are HashB, H_CD and H_EF_GH. With those two small pieces of data, the verifier can compute the proof all the way towards the Tree Head. And that is where the beauty of cryptography plays again: a signed Tree Head validates the issuance of all the certificates in its leaves. Certificate Transparency is now structural because you cannot present a valid inclusion proof for a certificate that is not already in a public log. Tampering any leaf invalidates its branch and the Tree Root itself. This is built-in security, not bolted-on!


## What comes next? What this means for the web and Chrome browser
Chrome is already experimenting with MTCs in production. Phase 1, currently underway in collaboration with Cloudflare, is a feasibility study evaluating real-world performance of MTC-based TLS connections. Importantly, every MTC connection during this phase is backed by a traditional X.509 certificate as a failsafe. Cloudflare published a detailed writeup on the bootstrap process. Google is measuring the gains without risking user security during the experiment.
Phase 2 targets Q1 2027, when established CT log operators will be invited to bootstrap the public MTC infrastructure. Phase 3, targeting Q3 2027, introduces the Chrome Quantum-resistant Root Store: an operating hybrid environment with a purpose-built trust store that only supports MTCs, running alongside the existing Chrome Root Program during the transition.
For security practitioners, this is worth tracking now rather than later. Understand your current CT compliance posture, start planning your transition to support public-facing certificates as MTCs are on track to replace the SCT model entirely. If you work in PKI or certificate infrastructure, you can follow the current draft for MTCs [here]( https://datatracker.ietf.org/doc/draft-ietf-plants-merkle-tree-certs/). Also, consider joining PLANTS working group [mailing list](https://mailman3.ietf.org/mailman3/lists/plants@ietf.org/) if this work interests you.
The quantum computing era is not a distant theoretical problem. Google's rollout timeline puts structural changes to the web's trust infrastructure less than two years away.
