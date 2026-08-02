---
title: "The July Storm, or How a Drawdown Was Sold to You as a Genius's Collapse"
description: "How Situational Awareness reportedly lost 67% in July, retained around 80% year-to-date returns, and why liquidating positions doesn't mean liquidating the fund."
pubDate: 2026-08-02T21:00:00
tags: ["Semiconductors", "AI", "Hedge Funds"]
heroImage: "/images/july-storm-leopold-aschenbrenner.webp"
heroImageAlt: "Cartoon: Leopold Aschenbrenner riding out a market storm in a paper boat"
draft: false
---

The PHLX Semiconductor Index (SOX) closed out the second quarter up nearly 88%, only for the market to hit reverse in July. SOXX, one of the sector's main benchmarks, lost 21.2%. The last time it was worse was December 2002.

![Worst months for SOXX](/images/soxx-worst-months.svg)

*Source: [ReturnsView](https://returnsview.com/stock/SOXX/). July's trajectory can also be checked against [historical SOXX quotes](https://stockanalysis.com/etf/soxx/history/): $640.76 at close on June 30 and $504.89 on July 31.*

My own July wasn't exactly a banner month either: just three positions all month, which you could follow in the Telegram channel, for a total of +0.5%. I wasn't going to trade for the sake of trading.

But I'm not writing this article over my own half a percent. While the market was storming, Leopold Aschenbrenner's timeline was already busy liquidating him, zeroing him out, and burying him along with Situational Awareness.

The real story, no embellishment needed, is bad enough as it is: according to a preliminary, unaudited estimate from a letter that was made available, -67% for July, margin pressure, and a forced sale of a significant chunk of the public portfolio. But somewhere along the way, liquidating positions got turned into liquidating the fund, and a severe risk-management failure got repackaged as "the collapse of a genius."

Let's break down how Situational Awareness actually operated, what Leo was betting on, why the fund ended up on the edge, and how, after a -67% month, it still came out at roughly +80% year-to-date and kept operating.

## How Leo's fund worked, and what happened to it

Situational Awareness is an AI-focused fund that Leopold Aschenbrenner founded in September 2024 after leaving OpenAI. The fund invested simultaneously in publicly traded companies and private companies. Its core thesis: AI development would become the market's main growth driver in the coming years. That's how Situational Awareness [describes its strategy](https://situationalawarenesslp.com/).

Leo bought companies that owned scarce pieces of AI infrastructure — memory, compute, data centers, and power. Notable holdings reportedly included SK hynix, SanDisk, CoreWeave, Bloom Energy, IREN, and Core Scientific.

At the same time, the fund bet against companies Leo considered vulnerable to AI disruption, including software makers like Adobe. As of March 31, the fund also disclosed put options (contracts that gain value when a stock falls) on Nvidia, AMD, Broadcom, Micron, TSMC, and the semiconductor sector broadly. These positions are visible in the fund's [13F filing with the SEC](https://www.sec.gov/Archives/edgar/data/2045724/000204572426000008/xslForm13F_X02/salp13fq1xml.xml), though such filings don't show conventional short positions or private investments, and don't confirm the portfolio's composition immediately before the July sell-off.

The private side of the portfolio included Anthropic, Fluidstack, and AI chipmaker MatX. Anthropic was one of the fund's largest private bets.

Here's a completely unrelated fact that has absolutely nothing to do with the investment thesis: Leo's fiancée, Avital Balwit, is chief of staff to Anthropic CEO Dario Amodei. A fund spokesperson [confirmed this](https://fortune.com/2025/10/08/leopold-aschenbrenner-openai-ftx-1-5-billion-hedge-fund-situational-awareness/). And if the wedding this past weekend went as planned, she's now his wife. No conclusions to draw here. Just a family portfolio that also happened to be fairly concentrated.

On paper, the portfolio held many different companies. Economically, almost all of them depended on the same scenario: AI spending keeps rising, memory and power stay scarce, and money keeps flowing from old-line software into infrastructure owners.

The fund amplified this bet with options and leverage (borrowed money). While the market moved in the right direction, leverage accelerated the gains. Before the July correction, Situational Awareness was up roughly 430-450% year-to-date.

## How the storm started

In July, AI infrastructure names turned lower. Memory, data center, and power stocks — the fund's core long positions (bets that profit from a rise) — began falling. Some names lost 30-60% of their value.

At the same time, software stocks the fund was short (bets that profit from a decline) started rising. That's the worst possible combination: longs falling, shorts rising. The fund was losing money on both sides at once.

Leverage sped up the losses. When the value of assets bought with borrowed money drops, the broker demands more collateral — a margin call. If there's no spare cash, positions have to be sold regardless of whether the manager still believes in their long-term upside.

The fund could be sitting on a massive year-to-date gain and simultaneously not have the cash to meet broker demands. Brokers don't care how much you made five months ago. They care about the value of the collateral today.

On July 24, Leo told partners that the drawdown had created the best buying opportunity in a year and a half. The fund started seeking additional capital to hold its positions and buy the dip. The [Financial Times](https://www.ft.com/content/280336bf-dbed-405f-b38e-5af644a21549) reported that Situational Awareness was trying to raise fresh capital after major losses. It didn't manage to raise the amount it needed in time.

At that point, the question was no longer whether Leo was right about AI five years out. The fund needed money now.

## The deal with Citadel

By the end of the month, a significant portion of the equity portfolio had been sold to Citadel in one large transaction. This format is called a block trade: a large package handed to a single buyer at once, instead of being sold piece by piece on the open market.

Sources disagree on the scale of the deal. [The Wall Street Journal](https://www.wsj.com/finance/citadel-buys-situational-awarenesss-stock-portfolio-after-big-losses-in-ai-5117159b) reports the sale of a significant portion of the portfolio. [Axios](https://www.axios.com/2026/07/30/ai-hedge-fund-situational-awareness-citadel) reports the sale of all public equities. Leo's own letter describes the sale of part of the public portfolio and the retention of fully paid-for, unleveraged positions.

So it's not accurate to say Citadel bought the fund. Citadel didn't acquire the management company or partner stakes in the fund — the deal was strictly about the equity positions.

According to Leo's letter, the fund closed all shorts and removed leverage and portfolio financing. Private positions, including Anthropic, were preserved. Based on available information, Situational Awareness was not shut down; the letter states that the fund's work on public and private investments continued, just at a lower risk level going forward.

## How +450% turned into +80%

The gain and the subsequent drop are calculated off different base amounts.

Imagine the fund started the year with $100. A 430% gain brings the capital up to $530:

$$
100 \times (1 + 4.30) = 530
$$

A 450% gain brings it up to $550:

$$
100 \times (1 + 4.50) = 550
$$

After a 67% drop, 33% of that amount remains:

$$
530 \times 0.33 = 174.9
$$

or:

$$
550 \times 0.33 = 181.5
$$

![How +430-450 percent turned into roughly +80 percent](/images/situational-awareness-return-math.svg)

*Source of the calculation: the letter to partners that was made available. The document's authenticity has not been independently verified; the figures are preliminary and unaudited.*

After the July drawdown, the fund retained roughly $175-182 out of its original $100. Year-to-date returns stayed in the +75% to +82% range. Hence the rounded +80% YTD figure cited in the letter to partners.

The fund didn't get wiped out. That said, -67% in a month is not an ordinary correction. It's a serious risk-management failure — Leo may well have been right about which companies to pick, but position sizing and leverage cost him the ability to simply wait out the recovery calmly.

The liquidation hit positions; based on available information, the fund itself was not shut down. The internet fused these two separate events into a tidy story about "the collapse of a genius."

## In place of a conclusion

And please, don't believe all the misinformation being sold to you on Instagram, TikTok, and Telegram channels. A loud headline doesn't become true just because five hundred people reposted it.

A trader's real work starts after the headline: go to the primary source, check the numbers, and figure out what actually happened yourself. In this story, it was enough to tell "liquidating positions" apart from "liquidating the fund" and to do the percentage math correctly. Most of the "genius's collapse" evaporated right there.

I'm hoping the July storm has passed and the market starts recovering in August. Starting Monday, I'm back to full-time coverage and will keep you posted on all my positions.

Fewer sensations on TikTok, more numbers in the terminal.

© Seal
