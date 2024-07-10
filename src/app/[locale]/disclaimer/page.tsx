'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Disclaimer() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;

            tg.BackButton.isVisible = true;
            tg.BackButton.onClick(() => {
                router.back();
            })

            return () => {
                tg.BackButton.isVisible = false;
            };
        }
    }, [router]);

    return (
        <main className="flex flex-col gap-4 text-sm p-4">
            <h1>Terms of use</h1>
            <p>Last updated December 26, 2023</p>
            <h2>1. GENERAL</h2>
            <p>1. By using our Website and Application (DeLab or DeWallet), you confirm that you have read and understood these Terms and give your express consent to be bound by tLe terms and conditions stated herein. IF YOU DO NOT AGREE WITH THESE TERMS, YOU MUST IMMEDIATELY CEASE USING THE WEBSITE AND/OR THE APPLICATION.</p>
            <p>2. We make our Terms available in our Application in its most recent version. We reserve the right, in our sole discretion, to make changes or modifications to these Terms from time to time. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms by your continued use of the Application after the date such revised Terms are posted.</p>
            <h3>2. APPLICATION</h3>
            <p>1. We provide you with the Application DeWallet that is a self-hosted, non-custodial wallet designed to make transactions within The Open Network blockchain. The Application is a software that provides the following functionality:</p>
            <p>1. generates public wallet addresses and encrypted private keys that you may use to send and receive digital assets within The Open Network blockchain;</p>
            <p>2. facilitates the submission of digital assets transfer instructions to The Open Network blockchain;</p>
            <p>3. allows end users to interact with third-party services providers to purchase digital assets. It is important to note that we do not provide digital assets sale and purchase services by ourselves; and/or</p>
            <p>4. allows users to interact with decentralized exchanges (e.g., Uniswap) to exchange digital assets. It is important to note that we do not provide digital assets exchange services by ourselves.</p>
            <p>2. The Application does not store your private keys, backup phrases, or passwords on its servers. It is important to note that you keep your private keys, backup phrases, or passwords secure. We recommend you write down your backup phrase and store it offline in such place that is not available to anybody except you. If you lose your private keys, backup phrases or passwords, it will not be possible for us to recover them for you and you will lose access to your digital assets stored by means of The Open Network blockchain.</p>
            <p>3. The Open Network blockchain is the only authentic means that records and stores the transactions you make by means of the Application. In order to be completed, all proposed transactions must be confirmed and recorded in The Open Network blockchain.</p>
            <p>4. The Open Network blockchain is a decentralized, peer-to-peer network supported by independent third parties. We do not own, control, or operate The Open Network blockchain. Therefore, we cannot guarantee that all of digital assets transactions you make by means of The Open Network Blockchain, including but not limited to any payments using NFT technology or payment cards,will be completed in due course.</p>
            <p>5. You have to inquire about the fees (e.g., validation or mining fees) associated with your digital assets transactions on your own. We shall not be responsible for any losses incurred due to the amount of transaction fees (gas) you spend (even if expected and/or former prices are lower than actual price).</p>
            <p>6. Based on our agreements with third-party services providers, the latter may:</p>
            <p>1. handle the payments you make to purchase digital assets by your bank card and/or your account set up with some payment services providers and/or provide other services to you;</p>
            <p>2. facilitate the exchange of digital assets;</p>
            <p>3. make it possible for you to make settlements by means of digital assets; and/or</p>
            <p>4. render other services to you.</p>
            <p>By being involved in any of the activities outlined in this Clause 2.6 above, you may be bound by the terms of service applicable to persons dealing with such third-party providers (including terms of service, privacy and cookie policies etc.). We shall not be held liable for any damages or losses, whether actual or alleged, resulting from or in connection with your use of or reliance on any such third-party provider.</p>
            <p>You may be subject to the AML/KYC regulations. For the avoidance of doubt, we take no responsibility whatsoever for your compliance or the compliance of any third-party providers with the AML/KYC regulations.</p>
            <h3>3. REGISTRATION AND USER ACCOUNT</h3>
            <p>1. To use the Application DeWallet, it will be necessary for you to register an account. We do not collect, store and/or process any personal information for those purposes other than theinformation you create through the Application, such as (i) public wallet addresses; (ii) the IP address of the device you use to access the Application; (iii) the type of browser software you are using; (iv) the operating system you are using; (v) the date and time you access or use the Application; and (vi) other non-personally identifiable information.</p>
            <p>2. The collected cookies are anonymized. Their purpose is to collect information about use of the Website and Application in order to improve the functions of the Website and of the Application.</p>
            <p>3. You expressly consent to processing of the data mentioned in 3.1 and 3.2.</p>
            <p>4. During your first use of the Application, it will generate a public key and a secret recovery phrase for you. You may share your public key with anybody you may wish.</p>
            <p>5. You must handle your secret recovery phrase being the sequence of twenty-four words in accordance with Clauses 2.2 and 4.7. You acknowledge that certain methods of securing your secret recovery phrase, such as storing it as a digital file on your personal device or on a cloud storage provider, may increase the risk that your account or secret recovery phrase will be compromised. You further acknowledge that you will not share with us nor any other third party any password or secret recovery phrase that relates to your use of the Website and/or Application, and that we will not be held responsible if you do share any such password or phrase, whether you do so knowingly or unknowingly. For the avoidance of doubt, we take no responsibility whatsoever for any theft of a secret recovery phrase that involved intrusion into a cloud provider’s data repository.</p>
            <p>6. By starting the use of our Application, you represent and warrant that on each date of the period during which you are bound by these Terms:</p>
            <p>1. you have the legal capacity to enter into these Terms;</p>
            <p>2. you are not under the age of 13;</p>
            <p>3. you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Application (if it is allowed according to the laws of your jurisdiction);</p>
            <p>4. you are not accessing the Application through automated or non-human means, whether through a bot, script or otherwise;</p>
            <p>5. you do not use the Application for any illegal or unauthorized purpose; and</p>
            <p>6. your use of the Application does not violate any applicable law or regulation.</p>
            <p>5. You also represent that your account is personal to you and agree not to provide any other person or entity with your user credentials, which make it possible for any third party to access to your account. You shall promptly inform us of any unauthorized use of your login information or any other security breach. You assume full liability for your own and third-party activities occurring under your account.</p>
            <p>6. In the event that you create an account on behalf of an entity, these Terms shall apply to both you and the respective entity.</p>
            <h3>4. ACCESS AND USE OF THE APPLICATION</h3>
            <p>1. You acknowledge that all the rights in and to the Application and to the Website (DeLab or DeWallet) and any content displayed thereon (including but not limited to all information, software, databases, video, audio, interface, graphics, trademarks, logos, designs, text, compilations and all other elements of the Website, the System or the Services) (the &quot;IP&quot;) are owned by us or licensed to us and are protected by intellectual property laws and other laws protecting proprietary rights.</p>
            <p>2. Except as expressly stated herein, these Terms do not grant you any ownership right to, or in, our IP in respect of the Website and/or the Application.</p>
            <p>3. Subject to your compliance with the Terms, we grant you a non-assignable, non-transferable, non-sublicensable, revocable, and non-exclusive license to use the Application on devices you own or control.</p>
            <p>4. By accessing the Application, you agree not to:</p>
            <p>1. sub-license, sell, rent, lease, transfer, assign, reproduce, distribute, host or otherwise commercially exploit the Application and/or the Website;</p>
            <p>2. remove or alter any trademark, copyright, or other proprietary notices of the Application and/or the Website;</p>
            <p>3. make derivative works based upon the Application and/or the Website;</p>
            <p>4. distribute, transfer, transmit, broadcast, display, or sell the Content (other than with reference to the Application or Website in accordance with these Terms).</p>
            <p>5. You acknowledge that we may terminate or suspend your access to and/or use of the Application and/or the Website or any of their sections at any time, for any reason or without notice.</p>
            <p>6. By using our Website or Application, you represent that your use of our Website or Application does not infringe any rights of any person or entity.</p>
            <h3>5. LINKS TO OTHER WEBSITES</h3>
            <p>1. Our Website or Application may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such third-party websites or services.</p>
            <p>2. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.</p>
            <h3>6. TERMINATION</h3>
            <p>1. These Terms are effective unless and until terminated by either you or us. You may terminate these Terms at any time by ceasing your use of our Website or Application.</p>
            <p>2. We may terminate or suspend your access to our Website or Application immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            <p>3. Upon termination, your right to use our Website or Application will immediately cease. If you wish to terminate your account, you may simply discontinue using our Website or Application.</p>
            <h3>7. DISCLAIMERS</h3>
            <p>1. The Website and Application are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            <p>2. We do not warrant that the functions contained in the Website or Application will be uninterrupted or error-free, that defects will be corrected, or that the Website or Application or the server that makes it available are free of viruses or other harmful components.</p>
            <p>3. We make no warranties regarding the correctness, accuracy, reliability, or quality of the Website or Application, or any content therein, or that your use of the Website or Application will be lawful in any particular jurisdiction.</p>
            <p>4. Any material downloaded or otherwise obtained through the use of the Website or Application is done at your own discretion and risk and you are solely responsible for any damage to your computer system or loss of data that results from the download of any such material.</p>
            <h3>8. LIMITATION OF LIABILITY</h3>
            <p>1. In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Website or Application; (ii) any conduct or content of any third party on the Website or Application; (iii) any content obtained from the Website or Application; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
            <p>2. Our total liability to you for all claims arising out of or relating to these Terms or use of the Website or Application, regardless of the form of the action, shall be limited to the amount paid by you, if any, to us during the 6 months prior to any claim.</p>
            <p>3. Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.</p>
            <h3>9. GOVERNING LAW AND JURISDICTION</h3>
            <p>1. These Terms shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions.</p>
            <p>2. Any dispute arising out of or in connection with these Terms, including any disputes regarding its existence, validity or termination, shall be exclusively resolved by the courts of Zurich, Switzerland.</p>
            <h3>10. MISCELLANEOUS</h3>
            <p>1. No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
            <p>2. If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms will continue in full force and effect.</p>
            <h3>11. CONTACT US</h3>
            <p>1. If you have any questions about these Terms, please contact us at <a href="mailto:email@company.com">email@company.com</a>.</p>
            <h2>5. DISCONTINUANCE OF SERVICES</h2>
            <p>We may, in our sole discretion and without cost to you, with or without prior notice, and at any time, modify or discontinue, temporarily or permanently, any portion of our services. You are solely responsible for storing outside of the DeWallet a backup of any wallet address and private key pair that you maintain in your wallet. Maintaining an external backup of any wallet address and private key pairs associated with your wallet will allow you to access the The Open Network blockchain upon which your wallet is secured. Such a backup will allow you to fully restore your wallet at any time. If you do not maintain a backup of your wallet data outside of the Application, you may fail to be able to access digital assets associated with your wallet. We shall not be held responsible or liable for any loss of your digital assets in the event that we discontinue or depreciate our services.</p>
            <h2>6. SUSPENSION OF SERVICES</h2>
            <p>We may suspend your right to use the Website and/or the Application (DeLab or DeWallet) immediately if we determine that your use of the Application violated these Terms, including, but not limited to your license and acceptable use obligations.</p>
            <h2>7. TERM AND TERMINATION</h2>
            <p>These Terms shall be effective since the date, when you start using the Website and/or Application (DeLab or DeWallet), until the date of termination in accordance with this Clause 7.</p>
            <p>You may terminate these Terms for any reason by ceasing use of the Website and/or Application.</p>
            <p>Either party (you or we) may terminate these Terms for cause if the other party is in material breach hereof and such material breach remains uncured for a period of 30 days from receipt of the other party’s notice of breach.</p>
            <p>We may also terminate these Terms for cause immediately:</p>
            <ul className='flex flex-col gap-4'>
                <li>1. if we have the right to suspend your use of the Website and/or the Application in accordance with Clause 6;</li>
                <li>2. if our relationship with a third-party partner who provides software or other technology we use within our Application expires, terminates, or requires us to change the way we provide the software or other technology as part of the Application;</li>
                <li>3. in order to avoid undue risk of violating the law.</li>
            </ul>
            <p>Upon the termination of these Terms:</p>
            <ul className='flex flex-col gap-4'>
                <li>1. all your rights under these Terms will terminate; and</li>
                <li>2. each party remains responsible for all fees and charges it has incurred through the termination and is responsible for any fees and charges it incurs during the post-termination period.</li>
            </ul>
            <h2>8. INDEMNIFICATION</h2>
            <p>You agree to indemnify and hold us, our Affiliates, licensors, shareholders, officers, directors, agents, servants, counsel, employees, consultants, lawyers and other representatives harmless from any losses, costs, liabilities and expenses (including reasonable attorneys’ fees) relating to or arising out of:</p>
            <ul className='flex flex-col gap-4'>
                <li>1. your use of, or inability to use the DeWallet</li>
                <li>2. your violation of these Terms;</li>
                <li>3. your violation of any third-party rights while using the Application;</li>
                <li>4. your violation of any applicable laws, rules or regulations in relation to the use of the Application.</li>
            </ul>
            <h2>9. DISCLAIMER</h2>
            <p>THE WEBSITE (DELAB) AND/OR APPLICATION (DEWALLET) ARE PROVIDED &quot;AS IS&quot;. EXCEPT TO THE EXTENT PROHIBITED BY LAW, OR TO THE EXTENT ANY STATUTORY RIGHTS APPLY THAT CANNOT BE EXCLUDED, LIMITED OR WAIVED, WE AND OUR AFFILIATES AND LICENSORS:</p>
            <ul className='flex flex-col gap-4'>
                <li>1. MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE REGARDING THE WEBSITE AND/OR APPLICATION, THE THIRD-PARTY CONTENT, OR THE THIRD-PARTY SERVICES, AND</li>
                <li>2. DISCLAIM ALL WARRANTIES, INCLUDING ANY IMPLIED OR EXPRESS WARRANTIES (I) OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR QUIET ENJOYMENT, (II) ARISING OUT OF ANY COURSE OF DEALING OR USAGE OF TRADE, (III) THAT THE WEBSITE AND/OR APPLICATION, THIRD-PARTY CONTENT, OR THIRD-PARTY SERVICE WILL BE UNINTERRUPTED, ERROR FREE OR FREE OF HARMFUL COMPONENTS, AND (IV) THAT ANY CONTENT WILL BE SECURE OR NOT OTHERWISE LOST OR ALTERED. YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED AND ARE NOT RELYING UPON ANY REPRESENTATION OR WARRANTY FROM US THAT IS NOT OTHERWISE IN THESE TERMS, AND YOU AGREE YOU WILL NOT TAKE A POSITION IN ANY PROCEEDING THAT IS INCONSISTENT WITH THIS PROVISION.</li>
            </ul>
            <p>OUR WEBSITE AND/OR APPLICATION RELY ON TON OPEN NETWORK THAT IS AN EMERGING TECHNOLOGY. YOUR USE THE APPLICATION IS SUBJECT TO INCREASED RISK THROUGH YOUR POTENTIAL MISUSE OF THINGS SUCH AS PUBLIC/PRIVATE KEY CRYPTOGRAPHY, OR FAILING TO PROPERLY UPDATE OR RUN SOFTWARE TO ACCOMMODATE PROTOCOL UPGRADES. BY USING THE APPLICATION YOU EXPLICITLY ACKNOWLEDGE AND ACCEPT THESE HEIGHTENED RISKS. YOU REPRESENT THAT YOU ARE FINANCIALLY AND TECHNICALLY SOPHISTICATED ENOUGH TO UNDERSTAND THE INHERENT RISKS ASSOCIATED WITH USING CRYPTOGRAPHIC AND BLOCKCHAIN-BASED SYSTEMS AND UPGRADING YOUR SOFTWARE AND PROCESSES TO ACCOMMODATE APPLICATION AND PROTOCOL UPGRADES, AND THAT YOU HAVE A WORKING KNOWLEDGE OF THE USAGE AND INTRICACIES OF DIGITAL ASSETS. IN PARTICULAR, YOU UNDERSTAND THAT WE DO NOT OPERATE THE OPEN NETWORK BLOCKCHAIN OR ANY OTHER BLOCKCHAIN PROTOCOL, COMMUNICATE OR EXECUTE PROTOCOL UPGRADES, OR APPROVE OR PROCESS BLOCKCHAIN TRANSACTIONS ON BEHALF OF YOU. YOU FURTHER UNDERSTAND THAT BLOCKCHAIN PROTOCOLS PRESENT THEIR OWN RISKS OF USE, THAT SUPPORTING OR PARTICIPATING IN THE PROTOCOL MAY RESULT IN LOSSES IF YOUR PARTICIPATION VIOLATES CERTAIN PROTOCOL RULES, THAT BLOCKCHAIN-BASED TRANSACTIONS ARE IRREVERSIBLE, THAT YOUR PRIVATE KEY AND SECRET RECOVERY PHRASE MUST BE KEPT SECRET AT ALL TIMES, THAT WE WILL NOT STORE A BACKUP OF, NOR WILL BE ABLE TO DISCOVER OR RECOVER, YOUR PRIVATE KEY OR SECRET RECOVERY PHRASE, THAT DIGITALLY COPYING AND STORING YOUR SECRET RECOVERY PHRASE ON A CLOUD STORAGE SYSTEM OR OTHER THIRD PARTY SUPPORTED DATA STORAGE, INCLUDING YOUR PERSONAL DEVICE, MAY INCREASE THE RISK OF LOSS OR THEFT, AND THAT YOU ARE SOLELY RESPONSIBLE FOR ANY APPROVALS OR PERMISSIONS YOU PROVIDE BY CRYPTOGRAPHICALLY SIGNING BLOCKCHAIN MESSAGES OR TRANSACTIONS, ESPECIALLY THOSE RESPONDING TO SOLICITATIONS AND OTHER PROMPTS FROM THIRD PARTIES.</p>
            <p>YOU FURTHER UNDERSTAND AND ACCEPT THAT DIGITAL ASSETS PRESENT MARKET VOLATILITY RISK, TECHNICAL SOFTWARE RISKS, REGULATORY RISKS, AND CYBERSECURITY RISKS. YOU UNDERSTAND THAT THE COST AND SPEED OF A BLOCKCHAIN-BASED SYSTEM IS VARIABLE, THAT COST MAY INCREASE DRAMATICALLY AT ANY TIME, AND THAT COST AND SPEED IS NOT WITHIN OUR CAPABILITY TO CONTROL. YOU UNDERSTAND THAT PROTOCOL UPGRADES MAY INADVERTENTLY CONTAIN BUGS OR SECURITY VULNERABILITIES THAT MAY RESULT IN LOSS OF FUNCTIONALITY AND ULTIMATELY FUNDS.</p>
            <p>YOU AGREE THAT YOU ALONE, AND NOT US, ARE RESPONSIBLE FOR ANY TRANSACTIONS THAT YOU ENGAGE IN WITH REGARD TO SUPPORTING ANY BLOCKCHAIN PROTOCOL WHETHER THROUGH TRANSACTION VALIDATION OR OTHERWISE, OR ANY TRANSACTIONS THAT YOU ENGAGE IN WITH ANY THIRD-PARTY-DEVELOPED SMART CONTRACT OR TOKEN, INCLUDING TOKENS THAT WERE CREATED BY A THIRD PARTY FOR THE PURPOSE OF FRAUDULENTLY MISREPRESENTING AFFILIATION WITH ANY BLOCKCHAIN PROJECT. YOU AGREE THAT WE ARE NOT RESPONSIBLE FOR THE REGULATORY STATUS OR TREATMENT IN ANY JURISDICTION OF ANY DIGITAL ASSETS THAT YOU MAY ACCESS OR TRANSACT WITH USING OUR APPLICATION. YOU EXPRESSLY ASSUME FULL RESPONSIBILITY FOR ALL OF THE RISKS OF ACCESSING AND USING THE APPLICATION TO INTERACT WITH BLOCKCHAIN PROTOCOLS.</p>
            <h2>10. LIMITATION OF LIABILITY</h2>
            <p>To the fullest extent permitted by applicable law, in no event will we or any of our shareholders, officers, directors, agents, servants, counsel, employees, consultants, lawyers, and other representatives authorized to act, acting, or purporting to act on our behalf be liable to you under contract, tort, strict liability, negligence, or any other legal or equitable theory, for:</p>
            <ul className='flex flex-col gap-4'>
                <li>1. any lost profits, data loss, cost of procurement of substitute goods or services, or direct, indirect, incidental, special, punitive, or consequential damages of any kind whatsoever, substitute goods or services (however arising),</li>
                <li>2. for any bugs, viruses, Trojan horses, or the like (regardless of the source of origination),</li>
                <li>3. for your access to or inability to access the Website (DeLab) or Application (DeWallet),</li>
                <li>4. for any conduct or content of any third party on the Website (DeLab) or Application (DeWallet),</li>
                <li>5. for any content obtained from the Website (DeLab) or Application (DeWallet), and</li>
                <li>6. for unauthorized access, use or alteration of your transmissions or content, whether or not based on warranty, contract, tort (including negligence), or any other legal or equitable theory, and whether or not we have been informed of the possibility of such damage, even if a limited remedy set forth herein is found to have failed of its essential purpose.</li>
            </ul>
        </main>
    )
}