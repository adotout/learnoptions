---
---

## Prerequisites
Before we get started, lets get some knowledge assumptions out of the way.

I will assume you basically know and understand:
* What a stock is
* High school level algebra (functions, slopes, etc.)

Helpful but not strictly necessary, and I'll try to explain as I go:
* 101 level calculus (i.e. derivatives)
* 101 level statistics (i.e. normal distributions)

For all examples I will be using a fake company "Widget Inc." symbol $WID.

## What are options

Ok, lets get started. What is an option?

An option is a contract between two people to either buy or sell a stock at a certain price, on or before a certain date. There are two types:
* Call (notated CALL or C) option - gives the option holder the right to **buy** shares
* Put (notated PUT or P) option - gives the option holder the right to **sell** shares

Lets look at a couple of examples:
* CALL WID 35 11/12/2013
    * The right to buy shares of $WID on or before 11/12/2013 at $35 per share
* PUT WID 25 11/11/2011
    * The right to sell shares of $WID on or before 11/11/2011 at $25 per share

Each property of an option has a name that you'll see often:
* **Underlying**: The stock that the option allows you to buy or sell, in this case $WID
* **Strike, or Strike Price**: The price that the contract allows you to buy or sell the underlying for, in the above examples 35 and 25
* **Expiration Date, or expiry**: The date through which the contract is valid, in the above examples 11/12/2013 and 11/11/2011
* **Type**: Whether the option is a Call or Put

One last thing: Each option contract is the option to buy or sell 100 shares of the underlying, but option prices are displayed _per underlying share_. So if you see an option that is priced $2.34, it will cost you $234 to buy it, not $2!

## Ok... but _why_?

Lets zoom in on our example above: CALL WID 35 11/12/2013. This contract gives us the _option_ to buy 100 shares of $WID at $35 per share, for the cost of (for example) $150. But why would you pay $150 for that contract?

The answer is: A whole bunch of reasons! But I want to highlight two examples that I think are the easiest to understand:
* Leverage
* Hedging

### Leverage

Lets look at an example where buying a call gives us _leverage_. Say we feel strongly that $WID will go from it's current trading price of $30 to $40.

I'm only giving you one option here, so go ahead and click "Buy" after you understand the inputs.

{{< marketsim id="basics0" >}}
