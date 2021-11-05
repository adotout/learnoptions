---
---

Volatility of stocks is the most important concept in understanding how options work. As we saw in the previous example, when the stock price moves a lot, there is more of a chance for our options to make money. So a stock with higher volatility will have higher options prices.

## What is Volatility?

You probably have an intuitive understanding of what "stock volatility" is. "Volatility is high when the stock price goes up and down a lot, and volatility is low when the stock price doesn't go up and down a lot". And that's totally right. But in order to be useful we need to get the volatility nailed down to some mathematical formula.

There are several methods of calculating volatility. But for options pricing, the formula we are looking for is: The **annualized**, **standard deviation**, of **daily log returns**. Sounds complicated, but we'll break it down in reverse order.

## Daily Log Returns

### Returns

You're probably familiar with the concept of "returns", since this is what's displayed on every stock chart you've ever seen. "Stock price up by 2% today", the 2% is the daily return. However, traditional returns present a problem for calculating volatility, because they are _asymmetrical_.

Lets look at an example:

    Day 1:
        Stock price at the start of the day: $100
        Stock price at the start of the day: $70
        Daily return: -30.0%
    Day 2:
        Stock price at the start of the day: $70
        Stock price at the start of the day: $100
        Daily return: +42.9%

Notice that on day 1 the return was -30%, and on day 2 the return was +42.9%, but we ended up exactly where we started $100. When calculating volatility, you don't care which direction the stock is going, you just want to know the relative magnitude of the change. So this asymmetry presents a problem.

### Log Returns

Log returns solve this asymmetry. For these examples we'll be using P0 for the price at the start of the day, and P1 for the price at the end of the day.

Before we look at log returns, here's the formula for returns:

    return = (P1 - P0) / P0

So from our day 2 example above (100 - 70) / 70 = ~0.429 = ~42.9%

The formula for log returns is:

    log_return = ln(P1 / P0)

Where ln is the natural log. Lets see what that changes about our examples above:

    Day 1:
        P0 = 100
        P1 = 70
        log_return = ln(70 / 100) = ~-0.357 = ~-35.7%
    Day 2:
        P0 = 70
        P1 = 100
        log_return = ln(100 / 70) = ~+0.357 = ~+35.7%

That's the symmetry we were looking for!

## Standard Deviation

A standard deviation is a way to measure the dispersion of a set of values. Or how "spread out" they are from the mean.

{{< rawhtml >}}
<div class="row">
    <div class="col-lg-6 col-md-12">
        <img src="/sigma.svg" class="img-fluid" style="width: 100%">
    </div>
</div>
<div class="row mb-3">
    <div class="col">
        <sup>By <a href="//commons.wikimedia.org/wiki/User:Mwtoews" title="User:Mwtoews">M. W. Toews</a> - <span class="int-own-work" lang="en">Own work</span>, based (in concept) on figure by Jeremy Kemp, on 2005-02-09, <a href="https://creativecommons.org/licenses/by/2.5" title="Creative Commons Attribution 2.5">CC BY 2.5</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1903871">Link</a></sup>
    </div>
</div>
{{< /rawhtml >}}

In this case the "set of values" we're looking at is the daily log returns. Lets look at an example.

{{< rawhtml >}}
<table class="table">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">End of day price</th>
      <th scope="col">Log return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>$100</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>$110</td>
      <td>9.5%</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>$105</td>
      <td>-4.7%</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>$95</td>
      <td>-10.0%</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>$101</td>
      <td>6.1%</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>$115</td>
      <td>13.0%</td>
    </tr>
  </tbody>
</table>
{{< /rawhtml >}}

The formula for standard deviation is not terribly important, but I'll add it here for your reference:

    standard_deviation = sqrt(sum((log_return - mean)^2) / n)

Or in english: The square root of the sum of the squared differences from the mean log return divided by the number of days.

Plugging our values in, we get: Standard deviation = 8.7% . Looking back at our standard deviation chart, we can see this means that on a random day there's a 68.2% chance that the stock price will be somewhere between +8.7% and -8.7% of the previous day, a 95% chance that it will be somewhere between +17.4% and -17.4%, and so on.

## Annualized Standard Deviation of Daily Log Returns

The last step is to annualize the standard deviation. The formula for this is simple:

    annualized_standard_deviation = standard_deviation * sqrt(252)

Where 252 is the average number of trading days in a year. Plugging in our example above, we get:

    annualized_volatility = 8.7% * sqrt(252) = 138.1%

So this is an extremely volatile stock. This is saying there's a 68.2% chance that the stock price will be somewhere between 138.1% and **-138.1%** over the course of one year.
