---
---
Before we get started, lets get some knowledge assumptions out of the way.

I will assume you basically know and understand:
* What a stock is
* High school level algebra (functions, slopes, etc.)

Helpful but not strictly necessary:
* 101 level calculus (i.e. derivatives)
* 101 level statistics (i.e. normal distributions)

For all examples I will be using a fake company "Widget Inc." symbol $WID.

Ok, lets get started. What is an option?

An option is a contract between two people to either buy or sell a stock at a certain price, on or before a certain date. There are two types:
* Call (notated CALL or C) option - this is an option to buy shares
* Put (notated PUT or P) option - this is an option to sell shares

Lets look at a couple of examples:
* CALL WID 35 11/12/2013
    * The option to buy $WID on or before 11/12/2013 at $35 per share
* PUT WID 25 11/11/2011
    * The option to sell $WID on or before 11/11/2011 at $25 per share

Each property of an option has a name that you'll see often:
* Underlying: The stock that the option allows you to buy or sell, in this case $WID
* Strike, or Strike Price: The price that the contract allows you to buy or sell the underlying for, in the above examples 35 and 25
* Expiration Date, or expiry: The date through which the contract is valid, in the above examples 11/12/2013 and 11/11/2011
* Type: Whether the option is a Call or Put

One last thing: Each option contract is the option to buy or sell 100 shares of the underlying, but option prices are displayed _per underlying share_. So if you see an option that is priced $2.34, it will cost you $234 to buy it, not $2!

Move on to the next section to play a little game to see why options might be useful.

{{< rawhtml >}}
<!--
  <h1>Hello</h1>-->
{{< /rawhtml >}}
