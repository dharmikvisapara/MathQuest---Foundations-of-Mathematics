import { Question } from '../types';

export const FALLBACK_QUESTIONS: Question[] = [
  // ==================== UNIT 1: COMBINATORICS (15 Questions) ====================
  {
    id: 'fb-u1-01',
    unitId: 'unit1',
    topic: 'Permutations without Repetition',
    difficulty: 'easy',
    questionText: 'In how many distinct ways can a committee of 4 officers (President, Vice-President, Secretary, Treasurer) be elected from a club of 10 members?',
    options: [
      { id: 'A', text: '210' },
      { id: 'B', text: '5,040' },
      { id: 'C', text: '10,000' },
      { id: 'D', text: '24' }
    ],
    correctOptionId: 'B',
    explanation: 'Since the offices are distinct, order matters. We use permutations: P(10, 4) = 10! / (10 - 4)! = 10 × 9 × 8 × 7 = 5,040.',
    formulaReference: 'P(n, r) = \\frac{n!}{(n - r)!}'
  },
  {
    id: 'fb-u1-02',
    unitId: 'unit1',
    topic: 'Combinations and Related Identities',
    difficulty: 'easy',
    questionText: 'Evaluate the binomial coefficient $\\binom{8}{3}$.',
    options: [
      { id: 'A', text: '56' },
      { id: 'B', text: '336' },
      { id: 'C', text: '28' },
      { id: 'D', text: '70' }
    ],
    correctOptionId: 'A',
    explanation: '$\\binom{8}{3} = \\frac{8!}{3!(8 - 3)!} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$.',
    formulaReference: 'C(n, r) = \\frac{n!}{r!(n - r)!}'
  },
  {
    id: 'fb-u1-03',
    unitId: 'unit1',
    topic: 'Permutations with Repetition & Multisets',
    difficulty: 'medium',
    questionText: 'How many distinct permutations can be formed from all the letters in the word "SUCCESS"?',
    options: [
      { id: 'A', text: '5,040' },
      { id: 'B', text: '840' },
      { id: 'C', text: '420' },
      { id: 'D', text: '210' }
    ],
    correctOptionId: 'C',
    explanation: 'The word "SUCCESS" has 7 letters: S appears 3 times, C appears 2 times, U appears 1 time, E appears 1 time. Permutations of this multiset = 7! / (3! × 2!) = 5040 / (6 × 2) = 5040 / 12 = 420.',
    formulaReference: '\\frac{n!}{n_1! \\cdot n_2! \\cdots n_k!}'
  },
  {
    id: 'fb-u1-04',
    unitId: 'unit1',
    topic: 'Circular Permutations',
    difficulty: 'easy',
    questionText: 'In how many ways can 6 delegates be seated around a round conference table?',
    options: [
      { id: 'A', text: '720' },
      { id: 'B', text: '120' },
      { id: 'C', text: '60' },
      { id: 'D', text: '36' }
    ],
    correctOptionId: 'B',
    explanation: 'For a circle without fixed positions, fixing one reference person eliminates rotational symmetry: P_{circ} = (n - 1)! = (6 - 1)! = 5! = 120.',
    formulaReference: 'P_{\\text{circ}} = (n - 1)!'
  },
  {
    id: 'fb-u1-05',
    unitId: 'unit1',
    topic: 'Pascal\'s Identity',
    difficulty: 'medium',
    questionText: 'By Pascal\'s Identity, the sum $\\binom{11}{4} + \\binom{11}{5}$ is equal to which of the following?',
    options: [
      { id: 'A', text: '$\\binom{12}{5}$' },
      { id: 'B', text: '$\\binom{12}{4}$' },
      { id: 'C', text: '$\\binom{22}{9}$' },
      { id: 'D', text: '$\\binom{11}{9}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Pascal\'s identity states $\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}$. With n = 11 and r = 5: $\\binom{11}{5} + \\binom{11}{4} = \\binom{12}{5}$.',
    formulaReference: '\\binom{n-1}{r-1} + \\binom{n-1}{r} = \\binom{n}{r}'
  },
  {
    id: 'fb-u1-06',
    unitId: 'unit1',
    topic: 'Binomial Theorem',
    difficulty: 'medium',
    questionText: 'Find the term independent of $x$ (the constant term) in the expansion of $\\left(x^2 + \\frac{1}{x}\\right)^9$.',
    options: [
      { id: 'A', text: '84' },
      { id: 'B', text: '36' },
      { id: 'C', text: '126' },
      { id: 'D', text: '9' }
    ],
    correctOptionId: 'A',
    explanation: 'The general term is $T_{r+1} = \\binom{9}{r} (x^2)^{9-r} (x^{-1})^r = \\binom{9}{r} x^{18 - 2r - r} = \\binom{9}{r} x^{18 - 3r}$. For the term independent of $x$, set $18 - 3r = 0 \\implies r = 6$. The constant term is $\\binom{9}{6} = \\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84$.',
    formulaReference: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r'
  },
  {
    id: 'fb-u1-07',
    unitId: 'unit1',
    topic: 'Pigeonhole Principle',
    difficulty: 'easy',
    questionText: 'What is the minimum number of socks that must be drawn from a drawer containing 10 black pairs and 10 blue pairs (all loose) to guarantee at least one matching pair?',
    options: [
      { id: 'A', text: '21' },
      { id: 'B', text: '11' },
      { id: 'C', text: '3' },
      { id: 'D', text: '2' }
    ],
    correctOptionId: 'C',
    explanation: 'There are k = 2 color categories (black, blue). By the Pigeonhole Principle, drawing k + 1 = 3 socks guarantees at least two socks of the identical color: $\\lceil 3/2 \\rceil = 2$.',
    formulaReference: 'N = k + 1'
  },
  {
    id: 'fb-u1-08',
    unitId: 'unit1',
    topic: 'Generalized Pigeonhole Principle',
    difficulty: 'medium',
    questionText: 'A university has 367 students in a discrete mathematics lecture. What is the guaranteed minimum number of students who share the exact same birthday (month and day, assuming 366 possible days in a leap year)?',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '366' }
    ],
    correctOptionId: 'B',
    explanation: 'Pigeons N = 367, Pigeonholes k = 366. By generalized PHP, at least one birthday must be shared by $\\lceil 367 / 366 \\rceil = 2$ students.',
    formulaReference: '\\left\\lceil \\frac{N}{k} \\right\\rceil'
  },
  {
    id: 'fb-u1-09',
    unitId: 'unit1',
    topic: 'Principle of Inclusion-Exclusion',
    difficulty: 'medium',
    questionText: 'How many integers between 1 and 100 inclusive are divisible by either 3 or 5?',
    options: [
      { id: 'A', text: '53' },
      { id: 'B', text: '47' },
      { id: 'C', text: '40' },
      { id: 'D', text: '33' }
    ],
    correctOptionId: 'B',
    explanation: '$|A_3| = \\lfloor 100/3 \\rfloor = 33$, $|A_5| = \\lfloor 100/5 \\rfloor = 20$, $|A_3 \\cap A_5| = \\lfloor 100/15 \\rfloor = 6$. By PIE: $|A_3 \\cup A_5| = 33 + 20 - 6 = 47$.',
    formulaReference: '|A \\cup B| = |A| + |B| - |A \\cap B|'
  },
  {
    id: 'fb-u1-10',
    unitId: 'unit1',
    topic: 'Derangements',
    difficulty: 'medium',
    questionText: 'What is the number of derangements of 4 items, denoted $D_4$ or $!4$?',
    options: [
      { id: 'A', text: '24' },
      { id: 'B', text: '9' },
      { id: 'C', text: '8' },
      { id: 'D', text: '2' }
    ],
    correctOptionId: 'B',
    explanation: 'Using $D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}$, $D_4 = 24 \\times (1 - 1 + 1/2 - 1/6 + 1/24) = 24 \\times (12 - 4 + 1)/24 = 9$. Alternatively via recurrence: $D_3 = 2, D_2 = 1 \\implies D_4 = (4 - 1)(D_3 + D_2) = 3(2 + 1) = 9$.',
    formulaReference: 'D_n = (n - 1)(D_{n-1} + D_{n-2})'
  },
  {
    id: 'fb-u1-11',
    unitId: 'unit1',
    topic: 'Stars and Bars (Counting with Repetition)',
    difficulty: 'medium',
    questionText: 'Find the number of non-negative integer solutions to the equation $x_1 + x_2 + x_3 = 8$ where $x_1, x_2, x_3 \\ge 0$.',
    options: [
      { id: 'A', text: '45' },
      { id: 'B', text: '36' },
      { id: 'C', text: '28' },
      { id: 'D', text: '120' }
    ],
    correctOptionId: 'A',
    explanation: 'Using stars and bars for n = 3 variables and r = 8 identical units: $\\binom{n + r - 1}{r} = \\binom{3 + 8 - 1}{8} = \\binom{10}{8} = \\binom{10}{2} = \\frac{10 \\times 9}{2} = 45$.',
    formulaReference: '\\binom{n + r - 1}{r}'
  },
  {
    id: 'fb-u1-12',
    unitId: 'unit1',
    topic: 'Integer Compositions',
    difficulty: 'hard',
    questionText: 'How many total compositions (ordered partitions into positive integers) exist for the integer $n = 6$?',
    options: [
      { id: 'A', text: '11' },
      { id: 'B', text: '32' },
      { id: 'C', text: '64' },
      { id: 'D', text: '16' }
    ],
    correctOptionId: 'B',
    explanation: 'The total number of compositions of a positive integer $n$ is given by $2^{n - 1}$. For $n = 6$, total compositions = $2^{6 - 1} = 2^5 = 32$.',
    formulaReference: '\\sum_{k=1}^n \\binom{n - 1}{k - 1} = 2^{n - 1}'
  },
  {
    id: 'fb-u1-13',
    unitId: 'unit1',
    topic: 'Integer Partitions',
    difficulty: 'medium',
    questionText: 'What is the partition number $p(4)$, representing the number of ways to write 4 as an unordered sum of positive integers?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '4' },
      { id: 'C', text: '8' },
      { id: 'D', text: '7' }
    ],
    correctOptionId: 'A',
    explanation: 'The distinct partitions of 4 in non-increasing order are: 4; 3+1; 2+2; 2+1+1; 1+1+1+1. There are exactly 5 distinct partitions, so $p(4) = 5$.',
    formulaReference: 'p(n)'
  },
  {
    id: 'fb-u1-14',
    unitId: 'unit1',
    topic: 'Recurrence Relations',
    difficulty: 'hard',
    questionText: 'What is the characteristic equation and general solution of the linear recurrence relation $a_n - 7a_{n-1} + 12a_{n-2} = 0$?',
    options: [
      { id: 'A', text: '$r^2 - 7r + 12 = 0 \\implies a_n = A(3^n) + B(4^n)$' },
      { id: 'B', text: '$r^2 + 7r + 12 = 0 \\implies a_n = A(-3^n) + B(-4^n)$' },
      { id: 'C', text: '$r^2 - 7r - 12 = 0 \\implies a_n = (A + Bn)3^n$' },
      { id: 'D', text: '$r^2 - 12r + 7 = 0 \\implies a_n = A(7^n) + B(12^n)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Replace $a_{n-k}$ with $r^{2-k}$: $r^2 - 7r + 12 = 0$. Factoring gives $(r - 3)(r - 4) = 0$, yielding distinct roots $r_1 = 3, r_2 = 4$. The general solution is $a_n = A(3^n) + B(4^n)$.',
    formulaReference: 'r^2 - c_1 r - c_2 = 0'
  },
  {
    id: 'fb-u1-15',
    unitId: 'unit1',
    topic: 'Generating Functions',
    difficulty: 'hard',
    questionText: 'What is the closed form ordinary generating function for the sequence $a_n = 5^n$ ($n \\ge 0$)?',
    options: [
      { id: 'A', text: '$\\frac{1}{1 - 5x}$' },
      { id: 'B', text: '$\\frac{5}{1 - x}$' },
      { id: 'C', text: '$\\frac{1}{1 + 5x}$' },
      { id: 'D', text: '$\\frac{x}{(1 - 5x)^2}$' }
    ],
    correctOptionId: 'A',
    explanation: '$G(x) = \\sum_{n=0}^\\infty 5^n x^n = \\sum_{n=0}^\\infty (5x)^n$. This is an infinite geometric series with first term 1 and common ratio $5x$, summing to $\\frac{1}{1 - 5x}$ for $|5x| < 1$.',
    formulaReference: 'G(x) = \\sum_{n=0}^\\infty a_n x^n = \\frac{1}{1 - ax}'
  },

  // ==================== UNIT 2: NUMERICAL METHODS (15 Questions) ====================
  {
    id: 'fb-u2-01',
    unitId: 'unit2',
    topic: 'Absolute, Relative & Percentage Errors',
    difficulty: 'easy',
    questionText: 'If the true exact value of a parameter is $X = 5.00$ and its measured value is $X_a = 4.95$, what is the percentage error $E_p$?',
    options: [
      { id: 'A', text: '1.0%' },
      { id: 'B', text: '0.05%' },
      { id: 'C', text: '0.01%' },
      { id: 'D', text: '5.0%' }
    ],
    correctOptionId: 'A',
    explanation: 'Absolute error $E_a = |5.00 - 4.95| = 0.05$. Relative error $E_r = 0.05 / 5.00 = 0.01$. Percentage error $E_p = 0.01 \\times 100\\% = 1.0\\%$.',
    formulaReference: 'E_p = \\frac{|X - X_a|}{|X|} \\times 100\\%'
  },
  {
    id: 'fb-u2-02',
    unitId: 'unit2',
    topic: 'Error Bounds in Rounding',
    difficulty: 'medium',
    questionText: 'If a real number is rounded off to 3 decimal places, what is the upper bound on the absolute error?',
    options: [
      { id: 'A', text: '$0.0005 = 0.5 \\times 10^{-3}$' },
      { id: 'B', text: '$0.001 = 10^{-3}$' },
      { id: 'C', text: '$0.005$' },
      { id: 'D', text: '$0.0001$' }
    ],
    correctOptionId: 'A',
    explanation: 'Rounding to $m$ decimal places produces an absolute error bounded by $\\frac{1}{2} \\times 10^{-m}$. For $m = 3$, bound is $0.5 \\times 10^{-3} = 0.0005$.',
    formulaReference: '\\Delta x \\le \\frac{1}{2} \\times 10^{-m}'
  },
  {
    id: 'fb-u2-03',
    unitId: 'unit2',
    topic: 'Bisection Method',
    difficulty: 'easy',
    questionText: 'The Bisection method for root finding is guaranteed to converge because it is based on which fundamental mathematical theorem?',
    options: [
      { id: 'A', text: 'Intermediate Value Theorem' },
      { id: 'B', text: 'Mean Value Theorem' },
      { id: 'C', text: 'Rolle\'s Theorem' },
      { id: 'D', text: 'Taylor\'s Theorem' }
    ],
    correctOptionId: 'A',
    explanation: 'The Intermediate Value Theorem states that if a continuous function $f(x)$ changes sign over $[a, b]$ (i.e. $f(a)f(b) < 0$), there exists at least one root $c \\in (a, b)$ such that $f(c) = 0$.',
    formulaReference: 'f(a) \\cdot f(b) < 0'
  },
  {
    id: 'fb-u2-04',
    unitId: 'unit2',
    topic: 'Bisection Method Step Calculation',
    difficulty: 'medium',
    questionText: 'For $f(x) = x^3 - 4x - 9 = 0$ on $[2, 3]$ with $f(2) = -9 < 0$ and $f(3) = 6 > 0$, what is the first midpoint $x_1$ and the new bracket after evaluation?',
    options: [
      { id: 'A', text: '$x_1 = 2.5$; new bracket $[2.5, 3]$' },
      { id: 'B', text: '$x_1 = 2.5$; new bracket $[2, 2.5]$' },
      { id: 'C', text: '$x_1 = 2.75$; new bracket $[2.5, 2.75]$' },
      { id: 'D', text: '$x_1 = 2.25$; new bracket $[2, 2.25]$' }
    ],
    correctOptionId: 'A',
    explanation: 'Midpoint $x_1 = (2 + 3)/2 = 2.5$. Evaluate $f(2.5) = (2.5)^3 - 4(2.5) - 9 = 15.625 - 10 - 9 = -3.375 < 0$. Since $f(2.5) < 0$ and $f(3) > 0$, the root must lie in $[2.5, 3]$.',
    formulaReference: 'x_m = \\frac{a + b}{2}'
  },
  {
    id: 'fb-u2-05',
    unitId: 'unit2',
    topic: 'Newton-Raphson Method',
    difficulty: 'easy',
    questionText: 'What is the order of convergence of the Newton-Raphson method for a simple root?',
    options: [
      { id: 'A', text: 'Quadratic (order 2)' },
      { id: 'B', text: 'Linear (order 1)' },
      { id: 'C', text: 'Cubic (order 3)' },
      { id: 'D', text: 'Superlinear (order 1.618)' }
    ],
    correctOptionId: 'A',
    explanation: 'Near a simple root where $f\'(\\alpha) \\neq 0$, the error satisfies $e_{n+1} \\approx K e_n^2$, meaning the number of correct decimal places approximately doubles with each iteration (order 2).',
    formulaReference: 'e_{n+1} \\propto e_n^2'
  },
  {
    id: 'fb-u2-06',
    unitId: 'unit2',
    topic: 'Newton-Raphson Iteration',
    difficulty: 'medium',
    questionText: 'To find the reciprocal $\\frac{1}{N}$ without division using Newton-Raphson, we solve $f(x) = \\frac{1}{x} - N = 0$. What is the resulting iteration formula?',
    options: [
      { id: 'A', text: '$x_{n+1} = x_n(2 - N x_n)$' },
      { id: 'B', text: '$x_{n+1} = x_n(1 - N x_n)$' },
      { id: 'C', text: '$x_{n+1} = \\frac{x_n + N}{2}$' },
      { id: 'D', text: '$x_{n+1} = 2x_n - N$' }
    ],
    correctOptionId: 'A',
    explanation: '$f(x) = x^{-1} - N \\implies f\'(x) = -x^{-2}$. Newton formula: $x_{n+1} = x_n - \\frac{x_n^{-1} - N}{-x_n^{-2}} = x_n + x_n^2(x_n^{-1} - N) = x_n + x_n - N x_n^2 = x_n(2 - N x_n)$.',
    formulaReference: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}'
  },
  {
    id: 'fb-u2-07',
    unitId: 'unit2',
    topic: 'Secant Method',
    difficulty: 'medium',
    questionText: 'What is the order of convergence of the Secant method?',
    options: [
      { id: 'A', text: '$\\approx 1.618$ (The Golden Ratio $\\phi$)' },
      { id: 'B', text: '1.000 (Strictly linear)' },
      { id: 'C', text: '2.000 (Quadratic)' },
      { id: 'D', text: '0.500' }
    ],
    correctOptionId: 'A',
    explanation: 'The Secant method approximates the derivative with finite differences across the two previous iterates, resulting in an order of convergence $p = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$.',
    formulaReference: 'p = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618'
  },
  {
    id: 'fb-u2-08',
    unitId: 'unit2',
    topic: 'Regula-Falsi Method',
    difficulty: 'medium',
    questionText: 'What is the root estimate formula in the Regula-Falsi (Method of False Position) on interval $[a, b]$?',
    options: [
      { id: 'A', text: '$c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$' },
      { id: 'B', text: '$c = \\frac{a + b}{2}$' },
      { id: 'C', text: '$c = \\frac{a f(a) - b f(b)}{f(a) - f(b)}$' },
      { id: 'D', text: '$c = a - \\frac{f(a)}{f(b)}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Setting the secant line equation $y - f(a) = \\frac{f(b) - f(a)}{b - a}(x - a)$ to $y = 0$ and solving for $x$ yields $c = a - f(a)\\frac{b - a}{f(b) - f(a)} = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$.',
    formulaReference: 'c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}'
  },
  {
    id: 'fb-u2-09',
    unitId: 'unit2',
    topic: 'Gauss-Jordan Method',
    difficulty: 'easy',
    questionText: 'How does Gauss-Jordan elimination differ fundamentally from standard Gauss elimination?',
    options: [
      { id: 'A', text: 'Gauss-Jordan reduces the augmented matrix directly to Reduced Row Echelon Form (diagonal), avoiding back-substitution.' },
      { id: 'B', text: 'Gauss-Jordan is an iterative method, while Gauss elimination is direct.' },
      { id: 'C', text: 'Gauss-Jordan can only solve $2 \\times 2$ systems.' },
      { id: 'D', text: 'Gauss-Jordan requires computing matrix determinants.' }
    ],
    correctOptionId: 'A',
    explanation: 'Standard Gauss elimination reduces the augmented matrix $[A|b]$ to upper triangular form and requires back-substitution. Gauss-Jordan eliminates entries both below AND above each pivot, directly yielding the identity matrix and solutions.',
    formulaReference: '[A | b] \\xrightarrow{\\text{RREF}} [I | x]'
  },
  {
    id: 'fb-u2-10',
    unitId: 'unit2',
    topic: 'Iterative Linear Systems (Diagonal Dominance)',
    difficulty: 'medium',
    questionText: 'A square coefficient matrix $A$ is strictly diagonally dominant if for every row $i$:',
    options: [
      { id: 'A', text: '$|a_{ii}| > \\sum_{j \\neq i} |a_{ij}|$' },
      { id: 'B', text: '$a_{ii} = 0$' },
      { id: 'C', text: '$|a_{ii}| < \\sum_{j \\neq i} |a_{ij}|$' },
      { id: 'D', text: '$\\det(A) = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Strict diagonal dominance requires the magnitude of the diagonal element in each row to be strictly greater than the sum of the magnitudes of all other non-diagonal entries in that row. This is a sufficient condition for Jacobi and Gauss-Seidel convergence.',
    formulaReference: '|a_{ii}| > \\sum_{j \\neq i} |a_{ij}|'
  },
  {
    id: 'fb-u2-11',
    unitId: 'unit2',
    topic: 'Gauss-Seidel Method',
    difficulty: 'medium',
    questionText: 'Why does the Gauss-Seidel iterative method generally converge roughly twice as fast as the Jacobi method?',
    options: [
      { id: 'A', text: 'Gauss-Seidel immediately uses freshly updated variable values within the current iteration, whereas Jacobi holds values fixed from the previous iteration.' },
      { id: 'B', text: 'Gauss-Seidel inverts the matrix directly.' },
      { id: 'C', text: 'Gauss-Seidel uses double precision floating point arithmetic.' },
      { id: 'D', text: 'Jacobi method does not support 3-variable systems.' }
    ],
    correctOptionId: 'A',
    explanation: 'In Gauss-Seidel, as soon as $x_1^{(k+1)}$ is calculated, it is immediately substituted to compute $x_2^{(k+1)}$, accelerating convergence by using the most up-to-date estimates.',
    formulaReference: 'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j<i} a_{ij}x_j^{(k+1)} - \\sum_{j>i} a_{ij}x_j^{(k)}\\right)'
  },
  {
    id: 'fb-u2-12',
    unitId: 'unit2',
    topic: 'Finite Differences (Forward Differences)',
    difficulty: 'easy',
    questionText: 'If $y_0 = 4, y_1 = 9, y_2 = 18$, what is the second forward difference $\\Delta^2 y_0$?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '5' },
      { id: 'C', text: '9' },
      { id: 'D', text: '14' }
    ],
    correctOptionId: 'A',
    explanation: 'First forward differences: $\\Delta y_0 = y_1 - y_0 = 9 - 4 = 5$, and $\\Delta y_1 = y_2 - y_1 = 18 - 9 = 9$. Second forward difference: $\\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0 = 9 - 5 = 4$.',
    formulaReference: '\\Delta^2 y_0 = y_2 - 2y_1 + y_0'
  },
  {
    id: 'fb-u2-13',
    unitId: 'unit2',
    topic: 'Newton\'s Forward Interpolation',
    difficulty: 'hard',
    questionText: 'Given equidistant nodes with step size $h = 2$ and starting point $x_0 = 10$, what is the normalized step variable $u$ when interpolating at $x = 13$?',
    options: [
      { id: 'A', text: '$1.5$' },
      { id: 'B', text: '$3.0$' },
      { id: 'C', text: '$0.5$' },
      { id: 'D', text: '$2.0$' }
    ],
    correctOptionId: 'A',
    explanation: 'The normalized parameter for Newton\'s forward formula is $u = \\frac{x - x_0}{h} = \\frac{13 - 10}{2} = \\frac{3}{2} = 1.5$.',
    formulaReference: 'u = \\frac{x - x_0}{h}'
  },
  {
    id: 'fb-u2-14',
    unitId: 'unit2',
    topic: 'Lagrange\'s Interpolation',
    difficulty: 'hard',
    questionText: 'For nodes $x_0 = 1, x_1 = 2, x_2 = 4$, what is the Lagrange basis polynomial $L_0(x)$ evaluated at $x = 3$?',
    options: [
      { id: 'A', text: '$-\\frac{1}{3}$' },
      { id: 'B', text: '$\\frac{2}{3}$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$-\\frac{1}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: '$L_0(x) = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)} = \\frac{(3 - 2)(3 - 4)}{(1 - 2)(1 - 4)} = \\frac{(1)(-1)}{(-1)(-3)} = \\frac{-1}{3} = -\\frac{1}{3}$.',
    formulaReference: 'L_0(x) = \\prod_{j \\neq 0} \\frac{x - x_j}{x_0 - x_j}'
  },
  {
    id: 'fb-u2-15',
    unitId: 'unit2',
    topic: 'Divided Differences',
    difficulty: 'medium',
    questionText: 'What is the first divided difference $f[x_0, x_1]$ for points $(2, 8)$ and $(5, 26)$?',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '18' },
      { id: 'C', text: '3' },
      { id: 'D', text: '9' }
    ],
    correctOptionId: 'A',
    explanation: '$f[x_0, x_1] = \\frac{f(x_1) - f(x_0)}{x_1 - x_0} = \\frac{26 - 8}{5 - 2} = \\frac{18}{3} = 6$.',
    formulaReference: 'f[x_0, x_1] = \\frac{f(x_1) - f(x_0)}{x_1 - x_0}'
  },

  // ==================== UNIT 3: OPERATIONS RESEARCH (15 Questions) ====================
  {
    id: 'fb-u3-01',
    unitId: 'unit3',
    topic: 'Linear Programming Graphical Method',
    difficulty: 'easy',
    questionText: 'In a two-variable Linear Programming Problem, where must an optimal solution lie if one exists and the feasible region is bounded?',
    options: [
      { id: 'A', text: 'At least at one corner point (vertex) of the feasible region.' },
      { id: 'B', text: 'Strictly in the interior of the region.' },
      { id: 'C', text: 'Always at the origin $(0, 0)$.' },
      { id: 'D', text: 'At the midpoint of the longest constraint boundary.' }
    ],
    correctOptionId: 'A',
    explanation: 'By the Fundamental Theorem of Linear Programming, a linear objective function over a convex polygonal feasible region attains its maximum and minimum at extreme points (vertices / corner points).',
    formulaReference: 'Z^* = \\max_{v \\in \\text{Vertices}} Z(v)'
  },
  {
    id: 'fb-u3-02',
    unitId: 'unit3',
    topic: 'Graphical LPP - Special Cases',
    difficulty: 'medium',
    questionText: 'When does a linear programming problem have multiple (alternative) optimal solutions?',
    options: [
      { id: 'A', text: 'When the objective function line is parallel to an active binding constraint line segment.' },
      { id: 'B', text: 'When the feasible region is unbounded in the first quadrant.' },
      { id: 'C', text: 'When two constraints contradict each other.' },
      { id: 'D', text: 'When all slack variables are strictly zero.' }
    ],
    correctOptionId: 'A',
    explanation: 'If the slope of the objective function is identical to the slope of a boundary constraint line segment that achieves the optimal value, every point along that line segment between the two corner points is an optimal solution.',
    formulaReference: '\\nabla Z \\parallel \\nabla g_i'
  },
  {
    id: 'fb-u3-03',
    unitId: 'unit3',
    topic: 'Standard Form of LPP',
    difficulty: 'easy',
    questionText: 'To convert an inequality constraint of the form $2x_1 + 3x_2 \\le 15$ into an equality for standard form, what must be added?',
    options: [
      { id: 'A', text: 'A non-negative slack variable $s_1 \\ge 0$' },
      { id: 'B', text: 'A surplus variable subtracted' },
      { id: 'C', text: 'An artificial variable only' },
      { id: 'D', text: 'A penalty parameter $M$' }
    ],
    correctOptionId: 'A',
    explanation: 'For a "less-than-or-equal-to" ($\\le$) constraint, adding a slack variable $s_1 \\ge 0$ represents the unused capacity: $2x_1 + 3x_2 + s_1 = 15$.',
    formulaReference: 'a x_1 + b x_2 + s_1 = c, \\quad s_1 \\ge 0'
  },
  {
    id: 'fb-u3-04',
    unitId: 'unit3',
    topic: 'Simplex Algorithm Pivot Element',
    difficulty: 'medium',
    questionText: 'In a maximization Simplex tableau, which column is selected as the pivot column (entering variable)?',
    options: [
      { id: 'A', text: 'The column with the most negative value in the $z_j - c_j$ row (or largest positive $c_j - z_j$).' },
      { id: 'B', text: 'The column with the smallest ratio $b_i / a_{ij}$.' },
      { id: 'C', text: 'The column corresponding to the first slack variable.' },
      { id: 'D', text: 'The rightmost constant column $b$.' }
    ],
    correctOptionId: 'A',
    explanation: 'The column with the most negative $z_j - c_j$ indicator provides the steepest marginal increase in the objective function per unit of entering variable.',
    formulaReference: '\\min_j (z_j - c_j) < 0'
  },
  {
    id: 'fb-u3-05',
    unitId: 'unit3',
    topic: 'Simplex Leaving Variable Test',
    difficulty: 'medium',
    questionText: 'Given pivot column coefficients $a_{1r} = 2, a_{2r} = 4, a_{3r} = -1$ and RHS constants $b_1 = 8, b_2 = 12, b_3 = 6$, which row is selected as the leaving row?',
    options: [
      { id: 'A', text: 'Row 2 (Ratio $12/4 = 3$)' },
      { id: 'B', text: 'Row 1 (Ratio $8/2 = 4$)' },
      { id: 'C', text: 'Row 3 (Ratio $6/(-1) = -6$)' },
      { id: 'D', text: 'Any row arbitrarily' }
    ],
    correctOptionId: 'A',
    explanation: 'The Minimum Ratio Test only considers strictly positive coefficients $a_{ir} > 0$. Ratio Row 1 = $8/2 = 4$. Ratio Row 2 = $12/4 = 3$. Row 3 is excluded ($a_{3r} = -1 \\le 0$). The minimum positive ratio is 3 (Row 2), so Row 2 leaves.',
    formulaReference: '\\theta = \\min_{i: a_{ir} > 0} \\frac{b_i}{a_{ir}}'
  },
  {
    id: 'fb-u3-06',
    unitId: 'unit3',
    topic: 'Duality in Linear Programming',
    difficulty: 'medium',
    questionText: 'If a primal linear program has 3 decision variables and 5 inequality constraints, how many decision variables and constraints will its dual problem have?',
    options: [
      { id: 'A', text: '5 variables and 3 constraints' },
      { id: 'B', text: '3 variables and 5 constraints' },
      { id: 'C', text: '8 variables and 8 constraints' },
      { id: 'D', text: '15 variables and 15 constraints' }
    ],
    correctOptionId: 'A',
    explanation: 'In duality, the roles of variables and constraints swap: each primal constraint corresponds to a dual variable, and each primal variable corresponds to a dual constraint. Hence, 5 constraints become 5 dual variables, and 3 variables become 3 dual constraints.',
    formulaReference: 'm \\times n \\iff n \\times m'
  },
  {
    id: 'fb-u3-07',
    unitId: 'unit3',
    topic: 'Fundamental Duality Theorem',
    difficulty: 'hard',
    questionText: 'The Strong Duality Theorem states that if the primal problem has an optimal solution with objective value $Z^*$, then:',
    options: [
      { id: 'A', text: 'The dual also has an optimal solution with objective value $W^*$, and $Z^* = W^*$.' },
      { id: 'B', text: '$Z^* > W^*$ strictly.' },
      { id: 'C', text: '$Z^* + W^* = 0$.' },
      { id: 'D', text: 'The dual must be unbounded.' }
    ],
    correctOptionId: 'A',
    explanation: 'By the Strong Duality Theorem, if either primal or dual has a finite optimal solution, then both do, and the optimal objective values coincide exactly: $\\max Z = \\min W$.',
    formulaReference: 'Z^* = W^*'
  },
  {
    id: 'fb-u3-08',
    unitId: 'unit3',
    topic: 'Transportation Problem Feasibility Condition',
    difficulty: 'easy',
    questionText: 'For an $m \\times n$ transportation problem, how many basic allocated cells must a non-degenerate basic feasible solution contain?',
    options: [
      { id: 'A', text: '$m + n - 1$' },
      { id: 'B', text: '$m \\times n$' },
      { id: 'C', text: '$m + n$' },
      { id: 'D', text: '$m + n + 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Since total supply equals total demand (one redundant equation), the rank of the constraint matrix is $m + n - 1$. A non-degenerate basic solution has exactly $m + n - 1$ occupied cells without closed loops.',
    formulaReference: 'N_{\\text{basic}} = m + n - 1'
  },
  {
    id: 'fb-u3-09',
    unitId: 'unit3',
    topic: 'North-West Corner Rule (NWCR)',
    difficulty: 'medium',
    questionText: 'What is the characteristic feature of the Initial Basic Feasible Solution obtained by the North-West Corner Rule?',
    options: [
      { id: 'A', text: 'It allocates strictly according to topological position starting at cell $(1, 1)$, completely ignoring unit transportation costs.' },
      { id: 'B', text: 'It always yields the globally optimal minimum-cost solution.' },
      { id: 'C', text: 'It requires calculating dual $u_i$ and $v_j$ multipliers first.' },
      { id: 'D', text: 'It can only be used on square $n \\times n$ cost matrices.' }
    ],
    correctOptionId: 'A',
    explanation: 'NWCR is purely positional: it starts at the top-left cell $(1, 1)$, exhausts supply/demand, and steps right or down without considering costs, making it simple but usually higher in cost than Least Cost or VAM.',
    formulaReference: '\\text{Start at } (1, 1)'
  },
  {
    id: 'fb-u3-10',
    unitId: 'unit3',
    topic: 'MODI Optimality Test',
    difficulty: 'hard',
    questionText: 'In the MODI (u-v) optimality method, if an unallocated cell $(i, j)$ has opportunity cost $d_{ij} = c_{ij} - (u_i + v_j) < 0$, what does this signify?',
    options: [
      { id: 'A', text: 'The current transportation solution is not optimal; introducing cell $(i, j)$ into the basis will decrease total cost.' },
      { id: 'B', text: 'The problem is infeasible.' },
      { id: 'C', text: 'The solution is already optimal and degenerate.' },
      { id: 'D', text: 'Cell $(i, j)$ must be removed from the matrix.' }
    ],
    correctOptionId: 'A',
    explanation: '$d_{ij} = c_{ij} - (u_i + v_j)$ represents the net change in cost per unit transported along the stepping-stone loop. If $d_{ij} < 0$, shipping along this route lowers total cost.',
    formulaReference: 'd_{ij} = c_{ij} - (u_i + v_j) \\ge 0'
  },
  {
    id: 'fb-u3-11',
    unitId: 'unit3',
    topic: 'Transportation Degeneracy',
    difficulty: 'medium',
    questionText: 'How is degeneracy resolved in a transportation problem when the number of allocated cells is less than $m + n - 1$?',
    options: [
      { id: 'A', text: 'By placing an infinitesimally small positive allocation $\\varepsilon > 0$ in an independent unallocated cell that creates no closed loop.' },
      { id: 'B', text: 'By deleting one row and one column.' },
      { id: 'C', text: 'By multiplying all unit costs by zero.' },
      { id: 'D', text: 'By converting the matrix into an assignment problem.' }
    ],
    correctOptionId: 'A',
    explanation: 'Allocating $\\varepsilon$ to an independent cell satisfies the required $m + n - 1$ basic count, allowing all $u_i$ and $v_j$ multipliers to be calculated uniquely without altering actual costs.',
    formulaReference: '\\varepsilon \\to 0^+'
  },
  {
    id: 'fb-u3-12',
    unitId: 'unit3',
    topic: 'Assignment Problem & Hungarian Method',
    difficulty: 'easy',
    questionText: 'The Hungarian Method for solving an $n \\times n$ assignment problem relies on the principle that adding or subtracting a constant from any row or column of the cost matrix:',
    options: [
      { id: 'A', text: 'Leaves the optimal assignment schedule completely unchanged.' },
      { id: 'B', text: 'Doubles the optimal total cost.' },
      { id: 'C', text: 'Changes the optimal assignments to arbitrary random cells.' },
      { id: 'D', text: 'Converts a minimization problem to maximization.' }
    ],
    correctOptionId: 'A',
    explanation: 'Since exactly one element is chosen from each row and each column in any valid assignment, subtracting constants $u_i$ and $v_j$ shifts the total cost by a constant sum $\\sum u_i + \\sum v_j$ for all permutations, preserving the minimizing schedule.',
    formulaReference: 'c\'_{ij} = c_{ij} - u_i - v_j'
  },
  {
    id: 'fb-u3-13',
    unitId: 'unit3',
    topic: 'Two-Person Zero-Sum Game Theory',
    difficulty: 'easy',
    questionText: 'A two-person zero-sum game has a saddle point if and only if:',
    options: [
      { id: 'A', text: '$\\text{Maximin} = \\text{Minimax}$' },
      { id: 'B', text: '$\\text{Maximin} > \\text{Minimax}$' },
      { id: 'C', text: 'The value of the game $V = 0$' },
      { id: 'D', text: 'Both players play 50-50 mixed strategies' }
    ],
    correctOptionId: 'A',
    explanation: 'When Player A\'s maximin guaranteed floor equals Player B\'s minimax ceiling, neither player has any incentive to deviate from their pure strategies, establishing a saddle point equilibrium.',
    formulaReference: '\\max_i (\\min_j a_{ij}) = \\min_j (\\max_i a_{ij}) = V'
  },
  {
    id: 'fb-u3-14',
    unitId: 'unit3',
    topic: 'Dominance Principle in Game Theory',
    difficulty: 'medium',
    questionText: 'In game theory with payoff matrix for Player A (rows) against Player B (columns), a row $r_1$ dominates row $r_2$ if:',
    options: [
      { id: 'A', text: 'Every entry in row $r_1$ is $\\ge$ the corresponding entry in row $r_2$, so row $r_2$ can be deleted.' },
      { id: 'B', text: 'Every entry in row $r_1$ is $\\le$ the corresponding entry in row $r_2$.' },
      { id: 'C', text: 'The sum of row $r_1$ equals zero.' },
      { id: 'D', text: 'Row $r_1$ has identical numbers.' }
    ],
    correctOptionId: 'A',
    explanation: 'Player A wants to maximize payoffs. If row $r_1$ offers greater than or equal payoffs in every possible state of nature compared to $r_2$, Player A will never rationally play $r_2$. Hence $r_2$ is eliminated.',
    formulaReference: 'a_{1j} \\ge a_{2j} \\;\\forall j \\implies \\text{delete } r_2'
  },
  {
    id: 'fb-u3-15',
    unitId: 'unit3',
    topic: 'Fair Games in Game Theory',
    difficulty: 'easy',
    questionText: 'A two-person zero-sum game is defined to be "fair" if:',
    options: [
      { id: 'A', text: 'The value of the game is $V = 0$.' },
      { id: 'B', text: 'Both players have an equal number of strategies.' },
      { id: 'C', text: 'The payoff matrix is symmetric.' },
      { id: 'D', text: 'There are no saddle points.' }
    ],
    correctOptionId: 'A',
    explanation: 'In a zero-sum game where one player\'s gain is the other\'s loss, expected net payoff is balanced when the game value $V = 0$, meaning neither player possesses an inherent advantage.',
    formulaReference: 'V = 0'
  },

  // ==================== UNIT 4: LATTICES & BOOLEAN ALGEBRA (15 Questions) ====================
  {
    id: 'fb-u4-01',
    unitId: 'unit4',
    topic: 'Partial Order Relations',
    difficulty: 'easy',
    questionText: 'A binary relation $R$ on set $P$ is a Partial Order if and only if it satisfies which three properties?',
    options: [
      { id: 'A', text: 'Reflexive, Antisymmetric, Transitive' },
      { id: 'B', text: 'Reflexive, Symmetric, Transitive' },
      { id: 'C', text: 'Irreflexive, Symmetric, Transitive' },
      { id: 'D', text: 'Antisymmetric, Asymmetric, Total' }
    ],
    correctOptionId: 'A',
    explanation: 'A Partial Order must be Reflexive ($a \\le a$), Antisymmetric ($a \\le b \\land b \\le a \\implies a = b$), and Transitive ($a \\le b \\land b \\le c \\implies a \\le c$). (Reflexive + Symmetric + Transitive defines an Equivalence relation).',
    formulaReference: '(a \\le a) \\land (a \\le b \\land b \\le a \\implies a = b) \\land (a \\le b \\land b \\le c \\implies a \\le c)'
  },
  {
    id: 'fb-u4-02',
    unitId: 'unit4',
    topic: 'Hasse Diagram Conventions',
    difficulty: 'easy',
    questionText: 'In a Hasse diagram representing a finite POSET, which types of edges are explicitly omitted for visual clarity?',
    options: [
      { id: 'A', text: 'Self-loops (reflexivity) and transitive edges.' },
      { id: 'B', text: 'Covering edges.' },
      { id: 'C', text: 'Edges connecting the least element to atoms.' },
      { id: 'D', text: 'Edges connecting comparable elements.' }
    ],
    correctOptionId: 'A',
    explanation: 'Hasse diagrams display only immediate covering relations ($x \\prec y$) directed upward; self-loops (implied by reflexivity) and transitive jumps (implied by upward paths) are suppressed to avoid visual clutter.',
    formulaReference: 'x \\prec y \\iff x < y \\land \\nexists z (x < z < y)'
  },
  {
    id: 'fb-u4-03',
    unitId: 'unit4',
    topic: 'Maximal vs Greatest Elements',
    difficulty: 'medium',
    questionText: 'What is the precise distinction between a "maximal" element and the "greatest" element in a POSET $(P, \\le)$?',
    options: [
      { id: 'A', text: 'A maximal element has no element strictly above it, while the greatest element must be $\\ge$ EVERY element in the POSET.' },
      { id: 'B', text: 'There can be only one maximal element, but many greatest elements.' },
      { id: 'C', text: 'Greatest elements exist only in infinite POSETs.' },
      { id: 'D', text: 'They are completely synonymous.' }
    ],
    correctOptionId: 'A',
    explanation: 'An element $m$ is maximal if $\\nexists x \\in P$ such that $m < x$. An element $g$ is greatest if $x \\le g$ for all $x \\in P$. A POSET can have multiple incomparable maximal elements, but at most ONE unique greatest element.',
    formulaReference: 'x \\le g \\; \\forall x \\in P'
  },
  {
    id: 'fb-u4-04',
    unitId: 'unit4',
    topic: 'Lattices Definition as POSETs',
    difficulty: 'easy',
    questionText: 'A POSET $(L, \\le)$ is a Lattice if and only if for every pair of elements $\\{a, b\\} \\subseteq L$:',
    options: [
      { id: 'A', text: 'Both a unique Greatest Lower Bound (meet $a \\land b$) and a unique Least Upper Bound (join $a \\lor b$) exist.' },
      { id: 'B', text: 'Either $a \\le b$ or $b \\le a$ (elements are always comparable).' },
      { id: 'C', text: 'There are no maximal elements.' },
      { id: 'D', text: 'The cardinality $|L|$ is an even number.' }
    ],
    correctOptionId: 'A',
    explanation: 'By definition, a lattice is a POSET in which any two elements possess both a unique infimum (GLB / meet $\\land$) and a unique supremum (LUB / join $\\lor$).',
    formulaReference: '\\exists ! (a \\land b) \\quad \\text{and} \\quad \\exists ! (a \\lor b)'
  },
  {
    id: 'fb-u4-05',
    unitId: 'unit4',
    topic: 'Algebraic Laws of Lattices',
    difficulty: 'medium',
    questionText: 'Which algebraic identity represents the Absorption Law in a lattice $(L, \\land, \\lor)$?',
    options: [
      { id: 'A', text: '$a \\land (a \\lor b) = a$ and $a \\lor (a \\land b) = a$' },
      { id: 'B', text: '$a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c)$' },
      { id: 'C', text: '$a \\land a = a$' },
      { id: 'D', text: '$a \\land b = b \\land a$' }
    ],
    correctOptionId: 'A',
    explanation: 'The absorption laws state $a \\land (a \\lor b) = a$ and $a \\lor (a \\land b) = a$. Together with commutativity, associativity, and idempotency, they algebraically define a lattice.',
    formulaReference: 'a \\land (a \\lor b) = a, \\quad a \\lor (a \\land b) = a'
  },
  {
    id: 'fb-u4-06',
    unitId: 'unit4',
    topic: 'Divisor Lattice (D_n)',
    difficulty: 'medium',
    questionText: 'In the divisor lattice $(D_{36}, |)$, what are the meet ($a \\land b$) and join ($a \\lor b$) of elements 4 and 6?',
    options: [
      { id: 'A', text: '$4 \\land 6 = 2$ and $4 \\lor 6 = 12$' },
      { id: 'B', text: '$4 \\land 6 = 1$ and $4 \\lor 6 = 24$' },
      { id: 'C', text: '$4 \\land 6 = 4$ and $4 \\lor 6 = 36$' },
      { id: 'D', text: '$4 \\land 6 = 0$ and $4 \\lor 6 = 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'In a divisibility lattice $(D_n, |)$, the meet is the Greatest Common Divisor $\\gcd(a, b)$ and the join is the Least Common Multiple $\\text{lcm}(a, b)$. Here $\\gcd(4, 6) = 2$ and $\\text{lcm}(4, 6) = 12$. Both 2 and 12 divide 36.',
    formulaReference: 'a \\land b = \\gcd(a, b), \\quad a \\lor b = \\text{lcm}(a, b)'
  },
  {
    id: 'fb-u4-07',
    unitId: 'unit4',
    topic: 'Distributive Lattice - Birkhoff\'s Characterization',
    difficulty: 'hard',
    questionText: 'By Birkhoff\'s Theorem, a lattice $L$ is distributive if and only if it does NOT contain which two lattices as sublattices?',
    options: [
      { id: 'A', text: 'The pentagon lattice $N_5$ and the diamond lattice $M_3$' },
      { id: 'B', text: 'The square lattice $B_2$ and the line chain $C_3$' },
      { id: 'C', text: 'The Boolean algebra $B_3$ and power set $\\mathcal{P}(S)$' },
      { id: 'D', text: 'The cube lattice and the hexagon' }
    ],
    correctOptionId: 'A',
    explanation: 'Birkhoff\'s fundamental theorem states that a lattice is distributive if and only if neither the non-modular pentagon $N_5$ nor the modular non-distributive diamond $M_3$ is isomorphic to any of its sublattices.',
    formulaReference: 'N_5 \\not\\subseteq L \\land M_3 \\not\\subseteq L'
  },
  {
    id: 'fb-u4-08',
    unitId: 'unit4',
    topic: 'Complemented Lattices',
    difficulty: 'medium',
    questionText: 'In a bounded lattice $(L, \\land, \\lor, 0, 1)$, an element $b$ is a complement of $a$ if which conditions hold?',
    options: [
      { id: 'A', text: '$a \\land b = 0$ and $a \\lor b = 1$' },
      { id: 'B', text: '$a \\land b = 1$ and $a \\lor b = 0$' },
      { id: 'C', text: '$a \\le b$' },
      { id: 'D', text: '$a + b = 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'A complement $b$ of element $a$ in a bounded lattice must satisfy both $a \\land b = 0$ (meet is the universal lower bound) and $a \\lor b = 1$ (join is the universal upper bound).',
    formulaReference: 'a \\land b = 0 \\quad \\text{and} \\quad a \\lor b = 1'
  },
  {
    id: 'fb-u4-09',
    unitId: 'unit4',
    topic: 'Uniqueness of Complements',
    difficulty: 'medium',
    questionText: 'Under what condition is the complement of an element in a complemented lattice guaranteed to be unique?',
    options: [
      { id: 'A', text: 'If the lattice is Distributive.' },
      { id: 'B', text: 'If the lattice has an odd number of elements.' },
      { id: 'C', text: 'Only in infinite lattices.' },
      { id: 'D', text: 'Complements are always unique in every lattice.' }
    ],
    correctOptionId: 'A',
    explanation: 'In a distributive lattice, if an element has a complement, that complement is strictly unique. (In non-distributive lattices like $M_3$, elements can have multiple complements).',
    formulaReference: 'a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c)'
  },
  {
    id: 'fb-u4-10',
    unitId: 'unit4',
    topic: 'Definition of Boolean Algebra',
    difficulty: 'easy',
    questionText: 'A Boolean Algebra is algebraically defined as a lattice that is both:',
    options: [
      { id: 'A', text: 'Distributive and Complemented' },
      { id: 'B', text: 'Modular and Incomplete' },
      { id: 'C', text: 'Linear and Infinite' },
      { id: 'D', text: 'Non-commutative and Associative' }
    ],
    correctOptionId: 'A',
    explanation: 'A Boolean algebra is an algebraic system $(B, \\land, \\lor, \', 0, 1)$ that forms a complemented, distributive bounded lattice.',
    formulaReference: 'B = \\text{Distributive} + \\text{Complemented Lattice}'
  },
  {
    id: 'fb-u4-11',
    unitId: 'unit4',
    topic: 'Atoms in Boolean Algebra',
    difficulty: 'medium',
    questionText: 'In a Boolean algebra with bottom element $0$, what is an "atom"?',
    options: [
      { id: 'A', text: 'An element $a > 0$ that covers $0$ (i.e. no element $x$ exists such that $0 < x < a$).' },
      { id: 'B', text: 'An element that has no complement.' },
      { id: 'C', text: 'The universal zero element itself.' },
      { id: 'D', text: 'Any element that can be factored as a meet of two larger elements.' }
    ],
    correctOptionId: 'A',
    explanation: 'An atom is a minimal non-zero element; it covers 0 ($0 \\prec a$), meaning there are no intermediate elements strictly between 0 and $a$.',
    formulaReference: '0 \\prec a'
  },
  {
    id: 'fb-u4-12',
    unitId: 'unit4',
    topic: 'Stone\'s Representation Theorem',
    difficulty: 'hard',
    questionText: 'Stone\'s Representation Theorem for finite Boolean algebras establishes an isomorphism between any finite Boolean algebra $B$ and:',
    options: [
      { id: 'A', text: 'The power set $\\mathcal{P}(\\text{Atoms}(B))$ under set intersection and union.' },
      { id: 'B', text: 'The ring of integers modulo $n$.' },
      { id: 'C', text: 'The real line $[0, 1]$.' },
      { id: 'D', text: 'A cyclic group of order $2^n$.' }
    ],
    correctOptionId: 'A',
    explanation: 'Stone\'s theorem proves that every finite Boolean algebra $B$ is structurally isomorphic to the power set of its atomic elements: $B \\cong \\mathcal{P}(\\text{Atoms}(B))$.',
    formulaReference: 'B \\cong \\mathcal{P}(\\text{Atoms}(B))'
  },
  {
    id: 'fb-u4-13',
    unitId: 'unit4',
    topic: 'Cardinality of Boolean Algebras',
    difficulty: 'easy',
    questionText: 'Which of the following could be the number of elements in a finite Boolean algebra?',
    options: [
      { id: 'A', text: '16' },
      { id: 'B', text: '12' },
      { id: 'C', text: '6' },
      { id: 'D', text: '10' }
    ],
    correctOptionId: 'A',
    explanation: 'By Stone\'s Representation Theorem, a finite Boolean algebra with $k$ atoms is isomorphic to $\\mathcal{P}(S)$ where $|S| = k$. Therefore, $|B| = 2^k$. Since $16 = 2^4$, it is a valid size. Numbers like 6, 10, or 12 are impossible.',
    formulaReference: '|B| = 2^k'
  },
  {
    id: 'fb-u4-14',
    unitId: 'unit4',
    topic: 'De Morgan\'s Laws in Boolean Algebra',
    difficulty: 'easy',
    questionText: 'What is the dual of the Boolean expression $(x \\land y)\'$ according to De Morgan\'s Laws?',
    options: [
      { id: 'A', text: '$x\' \\lor y\'$' },
      { id: 'B', text: '$x\' \\land y\'$' },
      { id: 'C', text: '$x \\lor y$' },
      { id: 'D', text: '$(x \\lor y)\'$' }
    ],
    correctOptionId: 'A',
    explanation: 'De Morgan\'s First Law states $(x \\land y)\' = x\' \\lor y\'$ (the complement of a meet is the join of the complements).',
    formulaReference: '(x \\land y)\' = x\' \\lor y\''
  },
  {
    id: 'fb-u4-15',
    unitId: 'unit4',
    topic: 'Boolean Simplification',
    difficulty: 'medium',
    questionText: 'Simplify the Boolean algebraic expression: $E = x \\lor (x\' \\land y)$.',
    options: [
      { id: 'A', text: '$x \\lor y$' },
      { id: 'B', text: '$x \\land y$' },
      { id: 'C', text: '$x$' },
      { id: 'D', text: '$y$' }
    ],
    correctOptionId: 'A',
    explanation: 'Apply distributive law of $\\lor$ over $\\land$: $x \\lor (x\' \\land y) = (x \\lor x\') \\land (x \\lor y)$. Since $x \\lor x\' = 1$, this becomes $1 \\land (x \\lor y) = x \\lor y$.',
    formulaReference: 'x \\lor (x\' \\land y) = x \\lor y'
  }
];
