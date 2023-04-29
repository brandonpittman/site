---
date: 2022-03-04
meta:
  title: On Minimalist Financial Tracking
  description: It doesn't matter if you know how much you spent on groceries nine months ago.
---

# On Minimalist Financial Tracking

The same people who obsess over their task management systems are likely the same people who micromanage their finances.
It's good to know what's happening with your money, but knowing the amount you spent on groceries in a given month last year isn't useful.
What's useful is knowing how much you have, how much you owe, and if you're comfortable with sum of those two numbers.
I used to log every transaction in [Ledger][], but managing every little transaction was a chore.

Now, I maintain a list of assets and liabilities, which is really just plain text, and I view it with [Soulver][] on macOS. (Soulver is just a calculator app that lets you define variables and does smart processing using semi-natural language.)
After adding up positive values for assets and negative ones for liabilities, I get a return value for my net worth.
This way I know how much money I have.
I can keep sub-totals to see how much I had total for a month, and I can see the trend of how much money I have—not how much I spent on goods in arbitrary categories.
I find this to be more practical and faster than tracking each transaction, tagging it with keywords, and dating them.

I borrowed this idea from [Hamster Budget][] and it's already proven itself to me.
If you feel like you're spending too much time tracking your personal finances, give this system a try.
I think you'll find it's less stressful then commonly accepted practices nowadays.

Here's a sample budget that you might use in Soulver:

```
# Sample Budget

## Assets
Checking: $7,000
Savings: $3,000

## Incoming payments
Salary: $5,000

## Liabilities

## Debt
Credit card: −$200
Car loan: −$9,345

### Recurring costs
Rent: −$1,000
```

[ledger]: https://www.ledger-cli.org/
[soulver]: https://soulver.app/
[hamster budget]: https://github.com/slowernews/hamster-system#hamster-budget---organize-your-money
