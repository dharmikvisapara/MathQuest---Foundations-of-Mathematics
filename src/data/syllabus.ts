import { UnitInfo } from '../types';

export const SYLLABUS_UNITS: UnitInfo[] = [
  {
    id: 'unit1',
    number: 1,
    title: 'Combinatorics & Applications',
    tagline: 'The art and rigor of counting, arrangements, partitions, and generating functions',
    description: 'Master discrete structures through counting principles, permutations, combinations, pigeonhole bounds, derangements, recurrence relations, and generating functions.',
    iconName: 'Boxes',
    color: 'from-violet-600 to-indigo-600',
    topics: [
      {
        id: 'u1-counting-principles',
        unitId: 'unit1',
        title: 'Basic Counting Principles: Addition & Multiplication',
        subtitle: 'Fundamental rules governing disjoint choices and sequential decisions',
        definition: 'The Rule of Sum states that if a task can be performed in m ways and a second independent mutually exclusive task can be performed in n ways, either task can be performed in m + n ways. The Rule of Product states that if a procedure can be broken down into two successive stages with m and n ways respectively, the entire procedure can be carried out in m * n ways.',
        explanation: 'Think of addition as "OR" between non-overlapping alternatives (mutually exclusive choices). Think of multiplication as "AND" across sequential stages of decisions where each stage is performed independently.',
        formulas: [
          {
            name: 'Rule of Sum (Disjoint Sets)',
            latex: '|A \\cup B| = |A| + |B| \\quad \\text{if } A \\cap B = \\emptyset',
            symbols: [
              { symbol: '|A|', meaning: 'Cardinality (number of elements) in set A' },
              { symbol: '|B|', meaning: 'Cardinality of set B' },
              { symbol: 'A \\cap B = \\emptyset', meaning: 'Sets A and B share no common elements (mutually exclusive)' }
            ]
          },
          {
            name: 'Rule of Product (Cartesian Product)',
            latex: '|A \\times B| = |A| \\cdot |B| = m \\cdot n',
            symbols: [
              { symbol: '|A \\times B|', meaning: 'Number of ordered pairs (a, b) where a ∈ A and b ∈ B' },
              { symbol: 'm, n', meaning: 'Number of ways to complete stage 1 and stage 2' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Analyze Independence & Alternatives', description: 'Determine whether you are choosing between exclusive paths (Sum Rule) or chaining successive sub-choices (Product Rule).' },
          { stepNumber: 2, title: 'Check for Overlap', description: 'If options can occur simultaneously, subtract the intersection using the Inclusion-Exclusion Principle.' },
          { stepNumber: 3, title: 'Count Each Stage', description: 'Identify whether earlier choices restrict subsequent choices (e.g. repetition allowed vs not allowed).' },
          { stepNumber: 4, title: 'Compute Result', description: 'Multiply successive stages or add partitioned cases together.' }
        ],
        workedExamples: [
          {
            title: 'Computer Science Password Design',
            problem: 'A password must consist of 2 uppercase English letters followed by 3 digits. How many passwords can be formed if (a) repetition is allowed, (b) repetition is not allowed?',
            given: 'Alphabet size = 26, digits = 10 (0 through 9).',
            steps: [
              'Case (a) With repetition: Stage 1 = 26, Stage 2 = 26, Stage 3 = 10, Stage 4 = 10, Stage 5 = 10.',
              'Total (a) = 26 * 26 * 10 * 10 * 10 = 676 * 1000 = 676,000.',
              'Case (b) Without repetition: Stage 1 = 26, Stage 2 = 25, Stage 3 = 10, Stage 4 = 9, Stage 5 = 8.',
              'Total (b) = 26 * 25 * 10 * 9 * 8 = 650 * 720 = 468,000.'
            ],
            finalAnswer: '(a) 676,000 passwords; (b) 468,000 passwords.',
            notes: 'Product rule applies because stages are executed sequentially.'
          },
          {
            title: 'Selecting a Project Representative',
            problem: 'A department has 14 mathematics professors, 18 computer science professors, and 12 physics professors. In how many ways can one faculty committee chair be selected from any department?',
            given: 'Three mutually disjoint faculties.',
            steps: [
              'Since one chair is picked from any department, this is an OR choice between disjoint sets.',
              'Total = |Math| + |CS| + |Physics| = 14 + 18 + 12 = 44.'
            ],
            finalAnswer: '44 ways.',
            notes: 'Sum rule applies because a single person cannot hold primary faculty chair status in multiple departments.'
          }
        ],
        commonMistakes: [
          { mistake: 'Multiplying when choices are alternatives rather than successive stages.', correction: 'Ask yourself: "Am I doing this AND that (product) or this OR that (sum)?"' },
          { mistake: 'Forgetting to subtract common elements if alternatives overlap.', correction: 'Always check if intersection is non-empty.' }
        ],
        quickRevisionNotes: [
          'Rule of Sum: OR (Disjoint cases)',
          'Rule of Product: AND (Sequential stages)',
          'Total permutations of n distinct items: n!'
        ]
      },
      {
        id: 'u1-permutations',
        unitId: 'unit1',
        title: 'Permutations with & without Repetition',
        subtitle: 'Ordered arrangements of elements',
        definition: 'A permutation is an ordered arrangement of objects from a set. Without repetition, the number of r-permutations of n distinct objects is P(n, r) = n! / (n - r)!. With unlimited repetition, it is n^r. For a multiset with duplicate items, the number of permutations is n! / (n_1! * n_2! * ... * n_k!).',
        explanation: 'Order matters in permutations. Arranging books on a shelf, seating guests, or awarding 1st, 2nd, and 3rd place are permutations. If items are identical (like duplicate letters in "MATHEMATICS"), we divide by their individual factorials to eliminate overcounting.',
        formulas: [
          {
            name: 'Permutation without Repetition',
            latex: 'P(n, r) = {}^n P_r = \\frac{n!}{(n - r)!}',
            symbols: [
              { symbol: 'n', meaning: 'Total number of distinct items available' },
              { symbol: 'r', meaning: 'Number of positions/slots to fill (0 ≤ r ≤ n)' },
              { symbol: 'n!', meaning: 'Factorial: n × (n - 1) × ... × 1 with 0! = 1' }
            ]
          },
          {
            name: 'Permutations of Multisets (with duplicates)',
            latex: '\\frac{n!}{n_1! \\cdot n_2! \\cdot \\dots \\cdot n_k!} \\quad \\text{where } \\sum_{i=1}^k n_i = n',
            symbols: [
              { symbol: 'n_i', meaning: 'Count of identical items of type i' },
              { symbol: 'n', meaning: 'Total number of items' }
            ]
          },
          {
            name: 'Circular Permutations',
            latex: 'P_{\\text{circ}} = (n - 1)! \\quad \\text{(or } \\frac{(n-1)!}{2} \\text{ for flip-symmetric bracelets)}',
            symbols: [
              { symbol: 'n', meaning: 'Number of distinct elements around a circle' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Verify Order Significance', description: 'Confirm that changing the order yields a different valid configuration.' },
          { stepNumber: 2, title: 'Check Element Uniqueness', description: 'Identify if all items are distinct or if there are identical items of multiple types.' },
          { stepNumber: 3, title: 'Apply Constraints First', description: 'Seat restricted individuals or fill constrained slots before general elements.' },
          { stepNumber: 4, title: 'Divide by Duplicates', description: 'Divide total n! by the product of factorials of repeated items.' }
        ],
        workedExamples: [
          {
            title: 'Arranging Letters of "COMBINATORICS"',
            problem: 'How many distinct permutations can be formed from all the letters of the word "COMBINATORICS"?',
            given: 'Word has 13 letters: C:2, O:2, M:1, B:1, I:2, N:1, A:1, T:1, R:1, S:1.',
            steps: [
              'Total letters n = 13.',
              'Repeated counts: C appears 2 times, O appears 2 times, I appears 2 times. All other 7 letters appear 1 time.',
              'Formula: N = 13! / (2! * 2! * 2!) = 6,227,020,800 / 8 = 778,377,600.'
            ],
            finalAnswer: '778,377,600 distinct permutations.',
            notes: 'Each duplicate group of size k contributes a k! divisor.'
          },
          {
            title: 'Restricted Seating Arrangement',
            problem: 'Five students A, B, C, D, E are to sit in a line. In how many ways can they sit such that students A and B must always sit together?',
            given: '5 students; A and B act as a single block.',
            steps: [
              'Treat the pair (AB) as 1 single super-entity. Now we have 4 entities: (AB), C, D, E.',
              'Number of ways to arrange 4 entities = 4! = 24.',
              'Inside the block (AB), A and B can swap positions in 2! = 2 ways (AB or BA).',
              'By Rule of Product, total arrangements = 4! * 2! = 24 * 2 = 48.'
            ],
            finalAnswer: '48 ways.',
            notes: 'The "block method" or "tie method" reduces constrained items to a single unit.'
          }
        ],
        commonMistakes: [
          { mistake: 'Forgetting internal permutations of grouped items in block problems.', correction: 'Always multiply by the factorial of items within each bound block.' },
          { mistake: 'Confusing circular permutations (n-1)! with linear permutations n!.', correction: 'In a circle, rotating everyone by one position does not create a new relative arrangement, fixing one person reduces degrees of freedom by 1.' }
        ],
        quickRevisionNotes: [
          'Linear distinct: P(n, r) = n! / (n - r)!',
          'With replacement: n^r',
          'Multiset duplicates: n! / (n1! * n2! * ... * nk!)',
          'Circular: (n - 1)!'
        ]
      },
      {
        id: 'u1-combinations',
        unitId: 'unit1',
        title: 'Combinations and Related Identities',
        subtitle: 'Unordered selections and fundamental binomial properties',
        definition: 'A combination is an unordered selection of r elements from a set of n distinct elements, denoted C(n, r) or \\binom{n}{r} = n! / [r! * (n - r)!]. Essential identities include Symmetry \\binom{n}{r} = \\binom{n}{n-r}, Pascal\'s Identity \\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}, and Vandermonde\'s Convolution.',
        explanation: 'In combinations, order does NOT matter. Choosing a committee of 3 people from 10 is identical regardless of who is named first. The r! in the denominator divides out all internal permutations of the selected group.',
        formulas: [
          {
            name: 'Combination Formula',
            latex: '\\binom{n}{r} = C(n, r) = \\frac{n!}{r!(n - r)!}',
            symbols: [
              { symbol: 'n', meaning: 'Total available distinct items' },
              { symbol: 'r', meaning: 'Number of items chosen without regard to order' }
            ]
          },
          {
            name: 'Pascal\'s Identity',
            latex: '\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}',
            symbols: [
              { symbol: '\\binom{n-1}{r-1}', meaning: 'Combinations that include a designated fixed item' },
              { symbol: '\\binom{n-1}{r}', meaning: 'Combinations that exclude that designated item' }
            ]
          },
          {
            name: 'Vandermonde\'s Identity',
            latex: '\\binom{m + n}{r} = \\sum_{k=0}^r \\binom{m}{k}\\binom{n}{r - k}',
            symbols: [
              { symbol: 'm, n', meaning: 'Sizes of two disjoint sub-populations' },
              { symbol: 'r', meaning: 'Total committee size drawn from the merged group' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Verify Order Invariance', description: 'Confirm that {A, B} is identical to {B, A}.' },
          { stepNumber: 2, title: 'Partition Categories', description: 'Break down selection criteria by subgroups (e.g. at least 2 women, exactly 3 men).' },
          { stepNumber: 3, title: 'Calculate Each Subset', description: 'Compute combinations for each independent category and multiply.' },
          { stepNumber: 4, title: 'Sum Mutually Exclusive Cases', description: 'Add results of disjoint valid scenarios together.' }
        ],
        workedExamples: [
          {
            title: 'Committee Selection with Quota',
            problem: 'A committee of 5 is to be chosen from a group of 8 men and 6 women. In how many ways can the committee be formed if it must contain at least 3 women?',
            given: '8 men, 6 women, committee of 5. Condition: women >= 3.',
            steps: [
              'Case 1: Exactly 3 women and 2 men: C(6, 3) * C(8, 2) = 20 * 28 = 560.',
              'Case 2: Exactly 4 women and 1 man: C(6, 4) * C(8, 1) = 15 * 8 = 120.',
              'Case 3: Exactly 5 women and 0 men: C(6, 5) * C(8, 0) = 6 * 1 = 6.',
              'Sum of exclusive cases = 560 + 120 + 6 = 686.'
            ],
            finalAnswer: '686 ways.',
            notes: 'Always break "at least" problems into explicit disjoint cases or use complement counting.'
          },
          {
            title: 'Verifying Pascal\'s Identity Computationally',
            problem: 'Verify that C(7, 3) = C(6, 2) + C(6, 3).',
            given: 'n = 7, r = 3.',
            steps: [
              'LHS = C(7, 3) = 7! / (3! * 4!) = (7 * 6 * 5) / (3 * 2 * 1) = 35.',
              'RHS term 1: C(6, 2) = (6 * 5) / (2 * 1) = 15.',
              'RHS term 2: C(6, 3) = (6 * 5 * 4) / (3 * 2 * 1) = 20.',
              'RHS = 15 + 20 = 35 = LHS.'
            ],
            finalAnswer: 'LHS = 35 = RHS.',
            notes: 'Pascal\'s identity is the algebraic foundation of Pascal\'s triangle.'
          }
        ],
        commonMistakes: [
          { mistake: 'Using permutations when order does not matter in selection.', correction: 'If swapping members does not create a new committee, use C(n, r).' },
          { mistake: 'Overcounting in "at least" problems by picking required elements first and choosing the rest from the remainder.', correction: 'This creates duplicates; always partition into disjoint exact cases.' }
        ],
        quickRevisionNotes: [
          'C(n, r) = n! / (r!(n - r)!)',
          'C(n, 0) = C(n, n) = 1',
          'Sum_{r=0}^n C(n, r) = 2^n (total subsets of an n-element set)'
        ]
      },
      {
        id: 'u1-binomial-pigeonhole',
        unitId: 'unit1',
        title: 'Binomial Theorem & Pigeonhole Principle',
        subtitle: 'Algebraic expansions and guaranteed existence bounds',
        definition: 'The Binomial Theorem expands (x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k. The Pigeonhole Principle (PHP) states that if k + 1 or more objects are placed into k boxes, then at least one box must contain two or more objects. The Generalized Pigeonhole Principle states that if N objects are placed into k boxes, then at least one box contains at least \\lceil N/k \\rceil objects.',
        explanation: 'Binomial expansions govern coefficients in polynomials, probability distributions, and combinatorial identities. PHP is a powerful non-constructive proof technique: it proves that an extreme or duplicate condition MUST exist without needing to pinpoint which specific box holds it.',
        formulas: [
          {
            name: 'Binomial Theorem',
            latex: '(x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k',
            symbols: [
              { symbol: 'n', meaning: 'Non-negative integer power' },
              { symbol: '\\binom{n}{k}', meaning: 'Binomial coefficient: coefficient of x^{n-k} y^k' }
            ]
          },
          {
            name: 'Generalized Pigeonhole Bound',
            latex: '\\text{At least one container contains } \\ge \\left\\lceil \\frac{N}{k} \\right\\rceil \\text{ items}',
            symbols: [
              { symbol: 'N', meaning: 'Total number of items (pigeons)' },
              { symbol: 'k', meaning: 'Total number of containers (pigeonholes)' },
              { symbol: '\\lceil x \\rceil', meaning: 'Ceiling function: smallest integer ≥ x' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'For Binomial: Identify Terms', description: 'Write general term T_{r+1} = C(n, r) * a^{n-r} * b^r.' },
          { stepNumber: 2, title: 'Equate Exponents', description: 'To find a specific power of x, sum the exponents of x in the general term and equate to the target exponent.' },
          { stepNumber: 3, title: 'For PHP: Define Pigeons & Holes', description: 'Clearly label what entities are distributed (pigeons N) and what classes receive them (pigeonholes k).' },
          { stepNumber: 4, title: 'Evaluate Ceiling Quotient', description: 'Calculate \\lceil N / k \\rceil to determine the guaranteed minimum load.' }
        ],
        workedExamples: [
          {
            title: 'Finding Coefficient in Binomial Expansion',
            problem: 'Find the coefficient of x^6 in the expansion of (2x^2 - 3/x)^6.',
            given: 'n = 6, first term a = 2x^2, second term b = -3/x.',
            steps: [
              'General term: T_{r+1} = C(6, r) * (2x^2)^{6-r} * (-3/x)^r.',
              'Simplify exponents of x: x^{2(6-r)} * x^{-r} = x^{12 - 2r - r} = x^{12 - 3r}.',
              'Set exponent equal to 6: 12 - 3r = 6 => 3r = 6 => r = 2.',
              'Substitute r = 2: T_3 = C(6, 2) * (2)^{4} * (-3)^2 * x^6.',
              'C(6, 2) = 15; 2^4 = 16; (-3)^2 = 9.',
              'Coefficient = 15 * 16 * 9 = 2160.'
            ],
            finalAnswer: '2160.',
            notes: 'Remember the negative sign in (-3/x); even powers of negative terms yield positive results.'
          },
          {
            title: 'Guaranteed Matching Birth Months (PHP)',
            problem: 'What is the minimum number of students needed in a classroom to guarantee that at least 5 students were born in the same month?',
            given: 'Containers k = 12 months. Desired target bound \\lceil N / 12 \\rceil = 5.',
            steps: [
              'By PHP, if every month has at most 4 students, maximum total students = 12 * 4 = 48.',
              'Adding 1 more student forces at least one month to reach 4 + 1 = 5 students.',
              'Therefore, N_min = 12 * (5 - 1) + 1 = 48 + 1 = 49.'
            ],
            finalAnswer: '49 students.',
            notes: 'General formula for threshold: N = k*(m - 1) + 1 to guarantee at least m items in a hole.'
          }
        ],
        commonMistakes: [
          { mistake: 'Forgetting the negative sign in binomial terms like (x - y)^n.', correction: 'Always treat subtraction as + (-y).' },
          { mistake: 'Misidentifying pigeonholes versus pigeons in word problems.', correction: 'Containers are the fixed categories (e.g. 12 months, 7 days); items are the entities distributed.' }
        ],
        quickRevisionNotes: [
          'Binomial general term: T_{r+1} = C(n, r) x^{n-r} y^r',
          'Sum of coefficients: substitute x = 1, y = 1 => 2^n',
          'PHP threshold: N = k(m - 1) + 1 ensures at least m items in one container'
        ]
      },
      {
        id: 'u1-pie-derangements',
        unitId: 'unit1',
        title: 'Inclusion-Exclusion Principle & Derangements',
        subtitle: 'Correcting for overlaps and complete permutations without fixed points',
        definition: 'The Principle of Inclusion-Exclusion (PIE) computes the size of the union of multiple sets by alternating sums of intersections. A derangement is a permutation of elements such that no element appears in its original position. The number of derangements of n elements is denoted D_n or !n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} \\approx [n! / e].',
        explanation: 'When counting elements satisfying at least one property, simply adding sizes overcounts intersections. PIE systematically adds singletons, subtracts pair intersections, adds triple intersections, and so on. Derangements solve classic "hat check" problems where nobody gets their own hat back.',
        formulas: [
          {
            name: 'PIE for Three Sets',
            latex: '|A \\cup B \\cup C| = (|A|+|B|+|C|) - (|A \\cap B|+|B \\cap C|+|C \\cap A|) + |A \\cap B \\cap C|',
            symbols: [
              { symbol: '|A \\cup B \\cup C|', meaning: 'Elements in at least one of sets A, B, or C' },
              { symbol: '|A \\cap B|', meaning: 'Elements in both sets A and B' }
            ]
          },
          {
            name: 'Derangement Formula',
            latex: 'D_n = !n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = n! \\left( 1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\dots + \\frac{(-1)^n}{n!} \\right)',
            symbols: [
              { symbol: 'D_n', meaning: 'Number of derangements of n distinct items' },
              { symbol: 'e \\approx 2.71828', meaning: 'Euler\'s number; D_n is the nearest integer to n! / e for n ≥ 1' }
            ]
          },
          {
            name: 'Derangement Recurrence',
            latex: 'D_n = (n - 1)(D_{n-1} + D_{n-2}) \\quad \\text{with } D_1 = 0, D_2 = 1',
            symbols: [
              { symbol: 'D_1 = 0', meaning: 'A single item cannot be deranged' },
              { symbol: 'D_2 = 1', meaning: 'Two items {1, 2} can only be (2, 1)' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Define Bad Properties', description: 'Let condition c_i be "item i ends up in position i" or "number is divisible by prime p_i".' },
          { stepNumber: 2, title: 'Compute S_k Values', description: 'Compute sum of counts for single conditions S_1, pair intersections S_2, etc.' },
          { stepNumber: 3, title: 'Apply Alternating Signs', description: 'N(c_1\' c_2\' ... c_n\') = N - S_1 + S_2 - S_3 + ...' },
          { stepNumber: 4, title: 'Evaluate Derangement', description: 'For small n, use known values: D_1=0, D_2=1, D_3=2, D_4=9, D_5=44, D_6=265.' }
        ],
        workedExamples: [
          {
            title: 'Hat Check Derangement Problem',
            problem: 'Five gentlemen check their hats at a restaurant. In how many ways can the hats be returned such that no gentleman receives his own hat?',
            given: 'n = 5 distinct hats.',
            steps: [
              'We seek D_5 = !5.',
              'Using recurrence: D_1 = 0, D_2 = 1.',
              'D_3 = (3 - 1)(D_2 + D_1) = 2 * (1 + 0) = 2.',
              'D_4 = (4 - 1)(D_3 + D_2) = 3 * (2 + 1) = 9.',
              'D_5 = (5 - 1)(D_4 + D_3) = 4 * (9 + 2) = 4 * 11 = 44.',
              'Alternatively by sum formula: 5! * (1/2 - 1/6 + 1/24 - 1/120) = 120 * (60 - 20 + 5 - 1)/120 = 44.'
            ],
            finalAnswer: '44 derangements.',
            notes: 'The probability that nobody gets their own hat approaches 1/e ≈ 36.78% rapidly as n increases.'
          },
          {
            title: 'Numbers not Divisible by 2, 3, or 5 (PIE)',
            problem: 'How many integers between 1 and 300 (inclusive) are divisible by none of 2, 3, or 5?',
            given: 'Universe size N = 300.',
            steps: [
              '|A_2| = floor(300/2) = 150; |A_3| = floor(300/3) = 100; |A_5| = floor(300/5) = 60.',
              'Pairwise: |A_2 ∩ A_3| = 300/6 = 50; |A_2 ∩ A_5| = 300/10 = 30; |A_3 ∩ A_5| = 300/15 = 20.',
              'Triple: |A_2 ∩ A_3 ∩ A_5| = 300/30 = 10.',
              'Union = (150 + 100 + 60) - (50 + 30 + 20) + 10 = 310 - 100 + 10 = 220.',
              'None = Universe - Union = 300 - 220 = 80.'
            ],
            finalAnswer: '80 integers.',
            notes: 'This is Euler\'s totient style application of PIE.'
          }
        ],
        commonMistakes: [
          { mistake: 'Forgetting to alternate signs in PIE (e.g. subtracting triple intersections instead of adding).', correction: 'Remember: + Singles, - Pairs, + Triples, - Quadruples.' },
          { mistake: 'Thinking D_n = n! - 1.', correction: 'D_n counts permutations where NO element is fixed; n! - 1 only excludes the identity permutation.' }
        ],
        quickRevisionNotes: [
          'D_1=0, D_2=1, D_3=2, D_4=9, D_5=44, D_6=265',
          'D_n / n! -> 1/e as n -> infinity',
          'PIE alternating signs formula: N - S1 + S2 - S3 + ...'
        ]
      },
      {
        id: 'u1-multisets-partitions',
        unitId: 'unit1',
        title: 'Counting with Repetition, Multisets & Partitions',
        subtitle: 'Stars and bars, multiset selections, integer compositions, and partitions',
        definition: 'Selecting r elements from n types with unlimited repetition is equivalent to placing r indistinguishable stars into n distinguishable bins separated by n - 1 bars, giving C(n + r - 1, r). An integer composition of n into k parts is an ordered sequence of positive integers summing to n (total 2^{n-1}). An integer partition of n is an unordered multiset of positive integers summing to n.',
        explanation: 'Order matters in compositions (e.g. 1 + 2 and 2 + 1 are distinct compositions of 3). In partitions, order does NOT matter (1 + 2 and 2 + 1 represent the same partition {2, 1}). Stars and bars is one of the most versatile tools in combinatorics for distributing identical coins among distinct children.',
        formulas: [
          {
            name: 'Stars & Bars (Non-negative solutions: x_i ≥ 0)',
            latex: '\\binom{n + r - 1}{r} = \\binom{n + r - 1}{n - 1}',
            symbols: [
              { symbol: 'r', meaning: 'Total identical objects (stars) to distribute' },
              { symbol: 'n', meaning: 'Distinct containers or variable types' },
              { symbol: 'n - 1', meaning: 'Number of divider bars required' }
            ]
          },
          {
            name: 'Stars & Bars (Strictly positive solutions: x_i ≥ 1)',
            latex: '\\binom{r - 1}{n - 1}',
            symbols: [
              { symbol: 'r - 1', meaning: 'Gaps between r items where n - 1 bars can be placed' }
            ]
          },
          {
            name: 'Total Compositions of n',
            latex: '\\sum_{k=1}^n \\binom{n - 1}{k - 1} = 2^{n - 1}',
            symbols: [
              { symbol: 'n', meaning: 'Positive integer being decomposed' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Check Distinguishability', description: 'Are objects identical and bins distinct? If yes, apply Stars and Bars.' },
          { stepNumber: 2, title: 'Transform Lower Bounds', description: 'If x_i ≥ c_i, substitute y_i = x_i - c_i ≥ 0 so all variables start from 0.' },
          { stepNumber: 3, title: 'Formulate Stars and Bars', description: 'New target sum R\' = R - \\sum c_i. Formula becomes C(n + R\' - 1, R\').' },
          { stepNumber: 4, title: 'For Partitions', description: 'List systematically in non-increasing order: e.g. for n=4: 4, 3+1, 2+2, 2+1+1, 1+1+1+1 (p(4) = 5).' }
        ],
        workedExamples: [
          {
            title: 'Distributing Identical Cookies',
            problem: 'In how many ways can 10 identical cookies be distributed among 4 distinct children such that every child receives at least one cookie?',
            given: 'r = 10 identical items, n = 4 distinct children, condition: x_i ≥ 1.',
            steps: [
              'Positive integer solutions to x_1 + x_2 + x_3 + x_4 = 10 with x_i ≥ 1.',
              'Give 1 cookie to each child first (4 cookies given). Remaining cookies to distribute: 10 - 4 = 6.',
              'Now distribute 6 cookies among 4 children with y_i ≥ 0.',
              'Formula: C(n + r\' - 1, r\') = C(4 + 6 - 1, 6) = C(9, 6) = C(9, 3).',
              'C(9, 3) = (9 * 8 * 7) / (3 * 2 * 1) = 84.'
            ],
            finalAnswer: '84 ways.',
            notes: 'Using the direct formula C(r - 1, n - 1) gives C(10 - 1, 4 - 1) = C(9, 3) = 84.'
          },
          {
            title: 'Listing Partitions of Integer 5',
            problem: 'Find the partition number p(5) and list all distinct integer partitions of 5.',
            given: 'Integer n = 5.',
            steps: [
              'List in non-increasing order:',
              '1 part: [5]',
              '2 parts: [4, 1], [3, 2]',
              '3 parts: [3, 1, 1], [2, 2, 1]',
              '4 parts: [2, 1, 1, 1]',
              '5 parts: [1, 1, 1, 1, 1]',
              'Total count = 1 + 2 + 2 + 1 + 1 = 7.'
            ],
            finalAnswer: 'p(5) = 7.',
            notes: 'Euler\'s pentagonal number theorem can compute p(n) rapidly for large n.'
          }
        ],
        commonMistakes: [
          { mistake: 'Applying C(n + r - 1, r) when variables must be strictly positive (x_i ≥ 1).', correction: 'Subtract minimum quotas first or use C(r - 1, n - 1).' },
          { mistake: 'Confusing partitions (unordered) with compositions (ordered).', correction: 'For 3: compositions are 3, 2+1, 1+2, 1+1+1 (4 total = 2^{3-1}); partitions are 3, 2+1, 1+1+1 (3 total).' }
        ],
        quickRevisionNotes: [
          'x1 + ... + xn = r, xi >= 0 => C(n + r - 1, r)',
          'xi >= 1 => C(r - 1, n - 1)',
          'Compositions: 2^{n - 1}',
          'Small partition values: p(1)=1, p(2)=2, p(3)=3, p(4)=5, p(5)=7, p(6)=11'
        ]
      },
      {
        id: 'u1-recurrence-generating',
        unitId: 'unit1',
        title: 'Recurrence Relations & Generating Functions',
        subtitle: 'Solving difference equations and encoding sequences into algebraic series',
        definition: 'A linear homogeneous recurrence relation with constant coefficients has the form a_n = c_1 a_{n-1} + c_2 a_{n-2} + ... + c_k a_{n-k}. It is solved by finding roots of its characteristic equation r^k - c_1 r^{k-1} - ... - c_k = 0. An ordinary generating function (OGF) for a sequence (a_n) is the formal power series G(x) = \\sum_{n=0}^\\infty a_n x^n.',
        explanation: 'Recurrence relations define sequences where each term depends on preceding terms (e.g. Fibonacci: F_n = F_{n-1} + F_{n-2}). Generating functions transform hard combinatorial operations (like convolution or addition of random variables) into standard polynomial multiplication.',
        formulas: [
          {
            name: 'Characteristic Equation (Degree 2)',
            latex: 'a_n = c_1 a_{n-1} + c_2 a_{n-2} \\implies r^2 - c_1 r - c_2 = 0',
            symbols: [
              { symbol: 'r_1, r_2', meaning: 'Roots of characteristic polynomial' },
              { symbol: 'a_n = A r_1^n + B r_2^n', meaning: 'General solution if roots are distinct' },
              { symbol: 'a_n = (A + B n) r_1^n', meaning: 'General solution if roots are repeated (r_1 = r_2)' }
            ]
          },
          {
            name: 'Ordinary Generating Function',
            latex: 'G(x) = \\sum_{n=0}^\\infty a_n x^n = a_0 + a_1 x + a_2 x^2 + \\dots',
            symbols: [
              { symbol: 'G(x)', meaning: 'Formal power series generating function' },
              { symbol: 'x^n', meaning: 'Placeholder indicator for the n-th term of the sequence' }
            ]
          },
          {
            name: 'Geometric Series Generating Function',
            latex: '\\frac{1}{1 - ax} = \\sum_{n=0}^\\infty a^n x^n \\quad (|ax| < 1)',
            symbols: [
              { symbol: '1 / (1 - ax)', meaning: 'Closed form generating function for geometric sequence a^n' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Form Characteristic Polynomial', description: 'Replace a_{n-k} with r^{m-k} where m is the order of the recurrence.' },
          { stepNumber: 2, title: 'Solve for Roots', description: 'Find roots r_i. Account for multiplicities using factors of n.' },
          { stepNumber: 3, title: 'Form General Solution', description: 'Set a_n = \\sum A_i r_i^n and apply initial conditions (e.g. a_0, a_1) to solve constants A_i.' },
          { stepNumber: 4, title: 'For Generating Functions', description: 'Multiply recurrence by x^n, sum from n=k to infinity, and solve algebraically for G(x).' }
        ],
        workedExamples: [
          {
            title: 'Solving Second-Order Linear Recurrence',
            problem: 'Solve the recurrence relation a_n = 5a_{n-1} - 6a_{n-2} for n ≥ 2, given a_0 = 1, a_1 = 4.',
            given: 'c_1 = 5, c_2 = -6, a_0 = 1, a_1 = 4.',
            steps: [
              'Characteristic equation: r^2 - 5r + 6 = 0.',
              'Factor: (r - 2)(r - 3) = 0 => Roots: r_1 = 2, r_2 = 3 (distinct roots).',
              'General solution: a_n = A(2^n) + B(3^n).',
              'Apply a_0 = 1: A(2^0) + B(3^0) = 1 => A + B = 1.',
              'Apply a_1 = 4: A(2^1) + B(3^1) = 4 => 2A + 3B = 4.',
              'From equation 1, A = 1 - B. Substitute: 2(1 - B) + 3B = 4 => 2 + B = 4 => B = 2.',
              'Then A = 1 - 2 = -1.',
              'Final closed formula: a_n = -(2^n) + 2(3^n) = 2(3^n) - 2^n.'
            ],
            finalAnswer: 'a_n = 2(3^n) - 2^n.',
            notes: 'Check: a_2 = 2(9) - 4 = 14. By recurrence: 5(4) - 6(1) = 20 - 6 = 14. Verified!'
          },
          {
            title: 'Generating Function of Sequence a_n = 3^n',
            problem: 'Find the generating function G(x) for the sequence a_n = 3^n (n ≥ 0).',
            given: 'a_0 = 1, a_1 = 3, a_2 = 9, ...',
            steps: [
              'G(x) = sum_{n=0}^inf (3^n) x^n = sum_{n=0}^inf (3x)^n.',
              'This is an infinite geometric series with first term a = 1 and common ratio r = 3x.',
              'Using sum S = a / (1 - r) for |3x| < 1:',
              'G(x) = 1 / (1 - 3x).'
            ],
            finalAnswer: 'G(x) = 1 / (1 - 3x).',
            notes: 'Generating functions compress an infinite sequence into a compact rational function.'
          }
        ],
        commonMistakes: [
          { mistake: 'Writing r^2 + c_1 r + c_2 = 0 instead of moving all terms to one side (r^2 - c_1 r - c_2 = 0).', correction: 'Always write the equation with a_n corresponding to the highest degree.' },
          { mistake: 'Forgetting to include polynomial factor n for repeated characteristic roots.', correction: 'If root r has multiplicity 2, the general solution contains (A + B n) r^n.' }
        ],
        quickRevisionNotes: [
          'Distinct roots: a_n = A r1^n + B r2^n',
          'Repeated roots: a_n = (A + B n) r^n',
          'Fibonacci OGF: x / (1 - x - x^2)'
        ]
      }
    ]
  },
  {
    id: 'unit2',
    number: 2,
    title: 'Numerical Methods',
    tagline: 'Computational approximations, root finding, linear systems, and interpolation',
    description: 'Master error estimation, root finding algorithms (Bisection, Regula-Falsi, Newton-Raphson, Secant), systems of linear equations (Gauss, Jordan, Seidel, Jacobi), and finite difference interpolation (Newton Forward/Backward, Lagrange, Divided Differences).',
    iconName: 'Calculator',
    color: 'from-blue-600 to-cyan-600',
    topics: [
      {
        id: 'u2-errors-analysis',
        unitId: 'unit2',
        title: 'Absolute, Relative & Percentage Errors',
        subtitle: 'Quantifying computational approximations and precision limits',
        definition: 'Let X be the true exact value and X_a be the approximate value. The Absolute Error is E_a = |X - X_a|. The Relative Error is E_r = |X - X_a| / |X|. The Percentage Error is E_p = E_r * 100%. If a number is rounded to m decimal places, the maximum absolute error is bounded by (1/2) * 10^{-m}.',
        explanation: 'In engineering and scientific computation, exact analytical numbers often cannot be represented in finite computer memory. Absolute error gives the raw difference in units, while relative error normalizes it against the scale of the measurement.',
        formulas: [
          {
            name: 'Absolute Error',
            latex: 'E_a = |X - X_a|',
            symbols: [
              { symbol: 'X', meaning: 'True (exact) mathematical value' },
              { symbol: 'X_a', meaning: 'Approximate or computed numerical value' }
            ]
          },
          {
            name: 'Relative Error',
            latex: 'E_r = \\frac{|X - X_a|}{|X|} = \\frac{E_a}{|X|} \\quad (X \\neq 0)',
            symbols: [
              { symbol: 'E_r', meaning: 'Dimensionless relative discrepancy' }
            ]
          },
          {
            name: 'Percentage Error',
            latex: 'E_p = E_r \\times 100\\%',
            symbols: [
              { symbol: 'E_p', meaning: 'Error expressed as a percentage of true magnitude' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Find Exact and Approximate Values', description: 'Obtain exact analytical value X (e.g. 1/3) and rounded value X_a (e.g. 0.3333).' },
          { stepNumber: 2, title: 'Compute Difference', description: 'Subtract: X - X_a. Take absolute value for E_a.' },
          { stepNumber: 3, title: 'Divide by Exact Value', description: 'Divide E_a by |X| to find E_r.' },
          { stepNumber: 4, title: 'Scale to Percentage', description: 'Multiply E_r by 100% for E_p.' }
        ],
        workedExamples: [
          {
            title: 'Approximating Rational Fraction 2/7',
            problem: 'The true value of a quantity is X = 2/7. An engineer approximates it as X_a = 0.2857. Find the absolute, relative, and percentage errors.',
            given: 'X = 2/7 ≈ 0.28571428..., X_a = 0.2857.',
            steps: [
              'Absolute Error: E_a = |2/7 - 0.2857| = |0.28571428... - 0.2857| = 0.00001428... ≈ 1.4286 * 10^{-5}.',
              'Relative Error: E_r = E_a / |X| = (1.4286 * 10^{-5}) / (2/7) = (1.4286 * 10^{-5} * 7) / 2 ≈ 5.00 * 10^{-5}.',
              'Percentage Error: E_p = E_r * 100% = 5.00 * 10^{-5} * 100% = 0.005%.'
            ],
            finalAnswer: 'E_a ≈ 1.43 × 10^{-5}, E_r ≈ 5.00 × 10^{-5}, E_p ≈ 0.005%.',
            notes: 'Notice that relative error is dimensionless.'
          },
          {
            title: 'Rounding Bound Estimate',
            problem: 'A measurement is given as 4.35 accurate to 2 decimal places. What is the maximum possible absolute and relative error?',
            given: 'X_a = 4.35, m = 2 decimal places.',
            steps: [
              'Max Absolute Error: \\Delta X ≤ (1/2) * 10^{-2} = 0.005.',
              'Min possible true value X_min = 4.35 - 0.005 = 4.345.',
              'Max relative error E_{r,max} ≈ \\Delta X / X_a = 0.005 / 4.35 ≈ 0.001149 (0.115%).'
            ],
            finalAnswer: 'Max absolute error = 0.005, Max relative error ≈ 0.115%.',
            notes: 'Rounding error bound formula is Δx ≤ (1/2)*10^{-m}.'
          }
        ],
        commonMistakes: [
          { mistake: 'Dividing by the approximate value X_a instead of the exact value X when computing relative error.', correction: 'Definition of relative error is E_a / |X|.' },
          { mistake: 'Omitting absolute value and reporting negative errors.', correction: 'E_a and E_r are non-negative magnitudes by standard definition.' }
        ],
        quickRevisionNotes: [
          'E_a = |X - X_a|',
          'E_r = E_a / |X|',
          'E_p = E_r * 100%',
          'm decimal places rounding error <= 0.5 * 10^{-m}'
        ]
      },
      {
        id: 'u2-root-finding',
        unitId: 'unit2',
        title: 'Root Finding: Bisection, Regula-Falsi, Newton-Raphson & Secant',
        subtitle: 'Iterative numerical algorithms for solving non-linear algebraic equations f(x) = 0',
        definition: 'Root-finding methods locate roots of f(x) = 0. Bisection repeatedly halves a bracketing interval [a, b] where f(a)f(b) < 0 (linear convergence rate 1/2). Regula-Falsi uses the secant line intercept inside the bracket. Newton-Raphson uses tangent lines x_{n+1} = x_n - f(x_n)/f\'(x_n) (quadratic convergence order 2). The Secant method approximates the derivative numerically x_{n+1} = x_n - f(x_n)(x_n - x_{n-1}) / [f(x_n) - f(x_{n-1})] (superlinear order ≈ 1.618).',
        explanation: 'Bracketing methods (Bisection, Regula-Falsi) are guaranteed to converge if f is continuous, but are slower. Open methods (Newton-Raphson, Secant) converge dramatically faster when close to the root, but require a good initial guess and non-zero derivatives.',
        formulas: [
          {
            name: 'Bisection Midpoint',
            latex: 'x_{m} = \\frac{a + b}{2}, \\quad \\text{Interval length after } n \\text{ steps: } \\frac{b - a}{2^n}',
            symbols: [
              { symbol: '[a, b]', meaning: 'Current bracket satisfying f(a) · f(b) < 0' },
              { symbol: 'n', meaning: 'Number of iterations performed' }
            ]
          },
          {
            name: 'Newton-Raphson Iteration',
            latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)} \\quad (f\'(x_n) \\neq 0)',
            symbols: [
              { symbol: 'f(x_n)', meaning: 'Function value evaluated at current estimate' },
              { symbol: 'f\'(x_n)', meaning: 'First derivative (tangent slope) at x_n' }
            ]
          },
          {
            name: 'Regula-Falsi / False Position Intercept',
            latex: 'c = \\frac{a \\cdot f(b) - b \\cdot f(a)}{f(b) - f(a)}',
            symbols: [
              { symbol: 'c', meaning: 'x-intercept of the secant line connecting (a, f(a)) and (b, f(b))' }
            ]
          },
          {
            name: 'Secant Method Formula',
            latex: 'x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}',
            symbols: [
              { symbol: 'x_n, x_{n-1}', meaning: 'Two most recent iterative estimates' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Verify Bracketing Condition', description: 'For Bisection/Regula-Falsi, evaluate f(a) and f(b) and verify f(a) * f(b) < 0 (Intermediate Value Theorem).' },
          { stepNumber: 2, title: 'Compute Next Candidate', description: 'Calculate x_m = (a + b)/2 (Bisection) or x_{n+1} = x_n - f(x_n)/f\'(x_n) (Newton).' },
          { stepNumber: 3, title: 'Update Bracket or State', description: 'If f(x_m) * f(a) < 0, set b = x_m; else set a = x_m.' },
          { stepNumber: 4, title: 'Check Stopping Tolerance', description: 'Terminate when |x_{n+1} - x_n| < ε or |f(x_{n+1})| < ε.' }
        ],
        workedExamples: [
          {
            title: 'Newton-Raphson for Square Root of 5',
            problem: 'Use the Newton-Raphson method to calculate \\sqrt{5} correct to 3 decimal places, starting with initial guess x_0 = 2.',
            given: 'f(x) = x^2 - 5 = 0; f\'(x) = 2x. Initial guess x_0 = 2.',
            steps: [
              'Iteration formula: x_{n+1} = x_n - (x_n^2 - 5) / (2x_n) = (x_n + 5/x_n) / 2.',
              'Iteration 1 (n=0): x_1 = (2 + 5/2) / 2 = 4.5 / 2 = 2.25.',
              'Iteration 2 (n=1): x_2 = (2.25 + 5/2.25) / 2 = (2.25 + 2.22222) / 2 = 4.47222 / 2 = 2.23611.',
              'Iteration 3 (n=2): x_3 = (2.23611 + 5/2.23611) / 2 = 2.236068.',
              'Difference |x_3 - x_2| = |2.236068 - 2.23611| ≈ 0.00004 < 0.001.'
            ],
            finalAnswer: 'x ≈ 2.236.',
            notes: 'Quadratic convergence doubles the number of correct digits with each iteration.'
          },
          {
            title: 'Bisection Method First 2 Steps',
            problem: 'Perform 2 iterations of the Bisection Method for f(x) = x^3 - x - 2 = 0 on the interval [1, 2].',
            given: 'f(1) = 1 - 1 - 2 = -2 < 0; f(2) = 8 - 2 - 2 = 4 > 0. Bracket valid.',
            steps: [
              'Iteration 1: Midpoint c_1 = (1 + 2)/2 = 1.5.',
              'Evaluate f(1.5) = (1.5)^3 - 1.5 - 2 = 3.375 - 3.5 = -0.125 < 0.',
              'Since f(1.5) and f(2) have opposite signs, new bracket is [1.5, 2].',
              'Iteration 2: Midpoint c_2 = (1.5 + 2)/2 = 1.75.',
              'Evaluate f(1.75) = (1.75)^3 - 1.75 - 2 = 5.359375 - 3.75 = 1.609375 > 0.',
              'Since f(1.5) < 0 and f(1.75) > 0, new bracket is [1.5, 1.75].'
            ],
            finalAnswer: 'After 2 iterations, root lies in [1.5, 1.75] with best estimate x ≈ 1.75.',
            notes: 'Interval length halved from 1.0 to 0.5 to 0.25.'
          }
        ],
        commonMistakes: [
          { mistake: 'In Newton-Raphson, choosing an initial guess where f\'(x_0) = 0 or close to zero.', correction: 'Division by zero will occur or iterations will diverge violently.' },
          { mistake: 'Forgetting that Regula-Falsi can suffer from one stuck endpoint.', correction: 'Modified Regula-Falsi or Illinois method scales the stagnant endpoint value by 0.5.' }
        ],
        quickRevisionNotes: [
          'Bisection: order 1 (linear), guaranteed, steps = ceil(log2((b-a)/eps))',
          'Newton-Raphson: order 2 (quadratic), x_{n+1} = x_n - f(x_n)/f\'(x_n)',
          'Secant: order 1.618 (golden ratio), no derivative needed',
          'Regula-Falsi: guaranteed bracketing with linear interpolation'
        ],
        interactiveType: 'root-finding'
      },
      {
        id: 'u2-linear-systems',
        unitId: 'unit2',
        title: 'Systems of Linear Equations: Direct & Iterative Methods',
        subtitle: 'Gauss Elimination, Gauss-Jordan, Jacobi & Gauss-Seidel Methods',
        definition: 'Direct methods (Gauss Elimination, Gauss-Jordan) transform the augmented matrix [A|b] into upper triangular or reduced row echelon form (RREF) using row operations. Iterative methods (Jacobi, Gauss-Seidel) update x_i^{(k+1)} repeatedly from previous iterations. Gauss-Seidel uses freshly updated values immediately in the current iteration, converging roughly twice as fast as Jacobi. Convergence is guaranteed if the coefficient matrix is strictly diagonally dominant.',
        explanation: 'For small dense systems, direct methods give exact answers up to roundoff. For huge sparse systems (e.g. finite elements or fluid dynamics with millions of equations), iterative methods are vastly faster and conserve memory.',
        formulas: [
          {
            name: 'Strict Diagonal Dominance Condition',
            latex: '|a_{ii}| > \\sum_{j \\neq i} |a_{ij}| \\quad \\text{for all } i = 1, 2, \\dots, n',
            symbols: [
              { symbol: 'a_{ii}', meaning: 'Diagonal element of equation i' },
              { symbol: '\\sum_{j \\neq i} |a_{ij}|', meaning: 'Sum of absolute values of all other off-diagonal coefficients in row i' }
            ]
          },
          {
            name: 'Jacobi Iteration Step',
            latex: 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)} \\right)',
            symbols: [
              { symbol: 'x_j^{(k)}', meaning: 'Values from previous iteration k only' }
            ]
          },
          {
            name: 'Gauss-Seidel Iteration Step',
            latex: 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
            symbols: [
              { symbol: 'x_j^{(k+1)} (j < i)', meaning: 'Freshly updated values from current iteration k + 1 used immediately' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Verify Diagonal Dominance', description: 'Rearrange equations so that the largest coefficient in each row lies on the principal diagonal.' },
          { stepNumber: 2, title: 'Express in Iterative Form', description: 'Solve equation 1 for x_1, equation 2 for x_2, ..., equation n for x_n.' },
          { stepNumber: 3, title: 'Start with Initial Guess', description: 'Usually x^{(0)} = [0, 0, ..., 0]^T unless specified otherwise.' },
          { stepNumber: 4, title: 'Iterate until Convergence', description: 'Compute successive iterates until max_i |x_i^{(k+1)} - x_i^{(k)}| < tolerance.' }
        ],
        workedExamples: [
          {
            title: 'Gauss-Seidel 1st Iteration',
            problem: 'Perform 1 iteration of the Gauss-Seidel method for the system: 10x + y + z = 12; 2x + 10y + z = 13; 2x + 2y + 10z = 14, starting with initial vector x_0 = y_0 = z_0 = 0.',
            given: 'Matrix is strictly diagonally dominant: 10 > 1+1, 10 > 2+1, 10 > 2+2.',
            steps: [
              'Rewrite system for each variable:',
              'x = (12 - y - z) / 10',
              'y = (13 - 2x - z) / 10',
              'z = (14 - 2x - 2y) / 10',
              'Compute x_1 using y_0=0, z_0=0: x_1 = (12 - 0 - 0) / 10 = 1.2.',
              'Compute y_1 using updated x_1=1.2 and z_0=0: y_1 = (13 - 2(1.2) - 0) / 10 = (13 - 2.4)/10 = 10.6/10 = 1.06.',
              'Compute z_1 using updated x_1=1.2 and updated y_1=1.06: z_1 = (14 - 2(1.2) - 2(1.06)) / 10 = (14 - 2.4 - 2.12)/10 = 9.48/10 = 0.948.'
            ],
            finalAnswer: 'x_1 = 1.200, y_1 = 1.060, z_1 = 0.948.',
            notes: 'Notice how each updated value was immediately substituted into the subsequent calculations.'
          },
          {
            title: 'Gauss Elimination Back-Substitution',
            problem: 'Solve the upper-triangular system resulting from forward Gauss elimination: x + 2y + z = 9; 3y + 2z = 7; 4z = 8.',
            given: 'Upper triangular form.',
            steps: [
              'From equation 3: 4z = 8 => z = 2.',
              'Substitute z = 2 into equation 2: 3y + 2(2) = 7 => 3y + 4 = 7 => 3y = 3 => y = 1.',
              'Substitute y = 1 and z = 2 into equation 1: x + 2(1) + 2 = 9 => x + 4 = 9 => x = 5.'
            ],
            finalAnswer: 'x = 5, y = 1, z = 2.',
            notes: 'Back-substitution proceeds from the last equation upward.'
          }
        ],
        commonMistakes: [
          { mistake: 'Applying Jacobi or Gauss-Seidel without checking/rearranging for diagonal dominance.', correction: 'The iteration may diverge wildly if the diagonal elements are not dominant.' },
          { mistake: 'In Gauss-Seidel, accidentally using old values instead of the freshly computed ones.', correction: 'Gauss-Seidel always consumes x_1^{(k+1)} to compute x_2^{(k+1)} immediately.' }
        ],
        quickRevisionNotes: [
          'Direct: Gauss (Upper triangular + back substitution), Gauss-Jordan (RREF directly)',
          'Iterative: Jacobi (uses k-th vector entirely)',
          'Gauss-Seidel: uses current (k+1) values immediately',
          'Sufficient condition: Strict diagonal dominance |a_ii| > sum_{j!=i} |a_ij|'
        ]
      },
      {
        id: 'u2-interpolation',
        unitId: 'unit2',
        title: 'Interpolation: Newton Forward/Backward, Lagrange & Divided Differences',
        subtitle: 'Constructing polynomials that pass exactly through discrete data points',
        definition: 'Interpolation estimates values of f(x) between tabulated points. For equally spaced points with step h, Newton\'s Forward Formula uses forward differences \\Delta f_0 (best for x near beginning), and Newton\'s Backward Formula uses backward differences \\nabla f_n (best for x near end). For unequally spaced points, Lagrange\'s Interpolation Formula or Newton\'s Divided Difference Formula is applied.',
        explanation: 'Forward and backward formulas exploit finite difference tables where \\Delta y_i = y_{i+1} - y_i. If data points are not spaced equally (e.g. x = 1, 2, 5, 8), Lagrange polynomials L_i(x) = \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j} guarantee exact interpolation without equidistant constraints.',
        formulas: [
          {
            name: 'Newton Forward Interpolation',
            latex: 'P_n(x) = y_0 + u \\Delta y_0 + \\frac{u(u - 1)}{2!} \\Delta^2 y_0 + \\frac{u(u - 1)(u - 2)}{3!} \\Delta^3 y_0 + \\dots',
            symbols: [
              { symbol: 'u = \\frac{x - x_0}{h}', meaning: 'Normalized step variable from initial point x_0' },
              { symbol: 'h', meaning: 'Constant step size between consecutive points: x_{i+1} - x_i' },
              { symbol: '\\Delta y_0', meaning: 'First forward difference: y_1 - y_0' }
            ]
          },
          {
            name: 'Newton Backward Interpolation',
            latex: 'P_n(x) = y_n + v \\nabla y_n + \\frac{v(v + 1)}{2!} \\nabla^2 y_n + \\frac{v(v + 1)(v + 2)}{3!} \\nabla^3 y_n + \\dots',
            symbols: [
              { symbol: 'v = \\frac{x - x_n}{h}', meaning: 'Normalized step variable from ending point x_n' },
              { symbol: '\\nabla y_n', meaning: 'First backward difference: y_n - y_{n-1}' }
            ]
          },
          {
            name: 'Lagrange Interpolation Formula',
            latex: 'P(x) = \\sum_{i=0}^n y_i L_i(x), \\quad L_i(x) = \\prod_{j=0, j \\neq i}^n \\frac{x - x_j}{x_i - x_j}',
            symbols: [
              { symbol: 'L_i(x)', meaning: 'i-th Lagrange basis polynomial which equals 1 at x_i and 0 at x_j (j ≠ i)' }
            ]
          },
          {
            name: 'First Divided Difference',
            latex: 'f[x_0, x_1] = \\frac{f(x_1) - f(x_0)}{x_1 - x_0}',
            symbols: [
              { symbol: 'f[x_0, x_1]', meaning: 'Divided difference for arbitrary non-equidistant points' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Check Point Spacing', description: 'Are points equidistant (constant h)? If yes, use Newton Forward/Backward. If unequal, use Lagrange or Divided Difference.' },
          { stepNumber: 2, title: 'Construct Difference Table', description: 'Compute differences column by column: \\Delta y_i = y_{i+1} - y_i.' },
          { stepNumber: 3, title: 'Select Reference Point', description: 'Choose x_0 at the top for forward formula, or x_n at the bottom for backward formula.' },
          { stepNumber: 4, title: 'Compute u and Substitute', description: 'Calculate u = (x - x_0)/h and evaluate polynomial terms.' }
        ],
        workedExamples: [
          {
            title: 'Newton\'s Forward Difference Table & Interpolation',
            problem: 'Given data: x: [10, 20, 30], y: [100, 400, 900]. Estimate y at x = 15.',
            given: 'h = 10; x_0 = 10, y_0 = 100. Target x = 15.',
            steps: [
              'Difference table:',
              'Δy_0 = 400 - 100 = 300; Δy_1 = 900 - 400 = 500.',
              'Δ^2 y_0 = 500 - 300 = 200.',
              'Normalized variable: u = (x - x_0)/h = (15 - 10)/10 = 5/10 = 0.5.',
              'Newton Forward formula: y(15) = y_0 + u Δy_0 + [u(u - 1)/2] Δ^2 y_0.',
              'y(15) = 100 + (0.5)(300) + [(0.5)(0.5 - 1) / 2] (200).',
              'y(15) = 100 + 150 + [(0.5)(-0.5)/2] * 200 = 250 + (-0.125 * 200) = 250 - 25 = 225.'
            ],
            finalAnswer: 'y(15) = 225 (Exact, since y = x^2 => 15^2 = 225).',
            notes: 'The second forward difference is constant because y(x) is quadratic.'
          },
          {
            title: 'Lagrange Interpolation with Unequal Intervals',
            problem: 'Find the unique interpolating polynomial passing through points (1, 2), (2, 3), and (4, 11). Then find y at x = 3.',
            given: 'x_0 = 1, y_0 = 2; x_1 = 2, y_1 = 3; x_2 = 4, y_2 = 11.',
            steps: [
              'Notice intervals are unequal: (2 - 1) = 1, but (4 - 2) = 2.',
              'L_0(3) = [(3 - 2)(3 - 4)] / [(1 - 2)(1 - 4)] = [(1)(-1)] / [(-1)(-3)] = -1 / 3.',
              'L_1(3) = [(3 - 1)(3 - 4)] / [(2 - 1)(2 - 4)] = [(2)(-1)] / [(1)(-2)] = -2 / -2 = 1.',
              'L_2(3) = [(3 - 1)(3 - 2)] / [(4 - 1)(4 - 2)] = [(2)(1)] / [(3)(2)] = 2 / 6 = 1/3.',
              'y(3) = y_0 L_0(3) + y_1 L_1(3) + y_2 L_2(3) = 2(-1/3) + 3(1) + 11(1/3).',
              'y(3) = -2/3 + 3 + 11/3 = 9/3 + 3 = 3 + 3 = 6.'
            ],
            finalAnswer: 'y(3) = 6.',
            notes: 'Lagrange formula works for any collection of distinct x values without requiring equal steps.'
          }
        ],
        commonMistakes: [
          { mistake: 'Using Newton Forward formula for a value near the end of the table.', correction: 'Use Newton Backward formula near the end of the table to minimize truncation error.' },
          { mistake: 'Forgetting that u(u - 1) in Forward becomes v(v + 1) in the Backward formula.', correction: 'Backward signs are positive additions: v(v + 1)(v + 2)...' }
        ],
        quickRevisionNotes: [
          'Equal spacing h: Forward (start of table), Backward (end of table)',
          'Unequal spacing: Lagrange or Divided Difference',
          'u = (x - x0)/h for forward; v = (x - xn)/h for backward',
          'Degree n polynomial matches n + 1 data points'
        ],
        interactiveType: 'difference-table'
      }
    ]
  },
  {
    id: 'unit3',
    number: 3,
    title: 'Operations Research & Linear Programming',
    tagline: 'Optimization, Simplex algorithm, Duality, Transportation, Assignment, and Game Theory',
    description: 'Master mathematical programming and optimization: Graphical LPP, standard form, Simplex algorithm and tableau, Duality theorems, Transportation (NWCR, Least Cost, MODI), Hungarian assignment, and Two-Person Zero-Sum Game Theory.',
    iconName: 'TrendingUp',
    color: 'from-emerald-600 to-teal-600',
    topics: [
      {
        id: 'u3-or-graphical-lpp',
        unitId: 'unit3',
        title: 'Concepts of OR & Graphical Solution of Two-Variable LPP',
        subtitle: 'Formulation, feasible regions, extreme points, and corner point optimality',
        definition: 'Operations Research (OR) is a scientific decision-making methodology applying mathematical modeling, statistics, and optimization to complex operational systems. A Linear Programming Problem (LPP) maximizes or minimizes a linear objective function subject to linear constraints and non-negativity restrictions. The Fundamental Theorem of LP asserts that if an optimal solution exists, at least one extreme point (corner vertex) of the feasible convex polygon achieves optimality.',
        explanation: 'In 2 variables (x_1, x_2), each inequality defines a half-plane. The intersection of all half-planes forms the convex feasible region. Special outcomes include: Unique optimal solution (single corner), Multiple optimal solutions (entire boundary edge parallel to objective function), Unbounded solution (feasible region open and objective can grow indefinitely), and Infeasible problem (constraints are contradictory, intersection is empty).',
        formulas: [
          {
            name: 'General Linear Programming Model',
            latex: '\\text{Optimize } Z = c_1 x_1 + c_2 x_2 \\quad \\text{subject to } a_{i1} x_1 + a_{i2} x_2 \\le (\\text{or } \\ge, =) b_i, \\quad x_1, x_2 \\ge 0',
            symbols: [
              { symbol: 'Z', meaning: 'Objective function value' },
              { symbol: 'c_j', meaning: 'Objective coefficients (unit profit or cost)' },
              { symbol: 'b_i', meaning: 'Resource availability or requirement bounds' }
            ]
          },
          {
            name: 'Extreme Point Property',
            latex: 'Z^* = \\max_{x \\in \\mathcal{F}} Z(x) = \\max_{v \\in \\text{Vertices}(\\mathcal{F})} Z(v)',
            symbols: [
              { symbol: '\\mathcal{F}', meaning: 'Convex polygonal feasible region' },
              { symbol: 'v', meaning: 'Extreme point (corner vertex) at intersection of boundary lines' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Formulate Mathematical Model', description: 'Define decision variables x_1, x_2, state objective Z, and list all inequalities with x_1, x_2 ≥ 0.' },
          { stepNumber: 2, title: 'Graph Boundary Lines', description: 'Replace inequalities with equalities: find x- and y-intercepts for each line.' },
          { stepNumber: 3, title: 'Identify Feasible Region', description: 'Test test-point (0, 0) to determine which half-plane is valid for each constraint and shade the mutual intersection.' },
          { stepNumber: 4, title: 'Find Corner Points & Evaluate Z', description: 'Calculate coordinates of every vertex by solving line intersections. Substitute into Z to find maximum or minimum.' }
        ],
        workedExamples: [
          {
            title: 'Maximizing Factory Profit Graphically',
            problem: 'Maximize Z = 4x_1 + 3x_2 subject to: 2x_1 + x_2 ≤ 10, x_1 + 2x_2 ≤ 8, x_1, x_2 ≥ 0.',
            given: 'Constraints: Line 1: 2x_1 + x_2 = 10, Line 2: x_1 + 2x_2 = 8.',
            steps: [
              'Line 1 intercepts: (5, 0) and (0, 10). Feasible side includes (0, 0).',
              'Line 2 intercepts: (8, 0) and (0, 4). Feasible side includes (0, 0).',
              'Intersection of Line 1 & Line 2: Multiply Line 2 by 2: 2x_1 + 4x_2 = 16.',
              'Subtract Line 1: (2x_1 + 4x_2) - (2x_1 + x_2) = 16 - 10 => 3x_2 = 6 => x_2 = 2.',
              'Substitute x_2 = 2 into Line 1: 2x_1 + 2 = 10 => 2x_1 = 8 => x_1 = 4. Vertex = (4, 2).',
              'Identify all 4 vertices of the feasible polygon:',
              '1. O(0, 0): Z = 4(0) + 3(0) = 0',
              '2. A(5, 0): Z = 4(5) + 3(0) = 20',
              '3. B(4, 2): Z = 4(4) + 3(2) = 16 + 6 = 22',
              '4. C(0, 4): Z = 4(0) + 3(4) = 12',
              'Comparing Z values, vertex B(4, 2) achieves the maximum value of 22.'
            ],
            finalAnswer: 'Maximum Z = 22 at x_1 = 4, x_2 = 2.',
            notes: 'The feasible region is bounded, ensuring an optimal solution exists.'
          },
          {
            title: 'Detecting Infeasible LPP',
            problem: 'Determine the feasibility of: Maximize Z = 2x_1 + x_2 subject to x_1 + x_2 ≤ 2, x_1 + x_2 ≥ 5, x_1, x_2 ≥ 0.',
            given: 'Parallel constraint lines with opposing directions.',
            steps: [
              'Line 1: x_1 + x_2 ≤ 2 defines the half-plane below the line through (2, 0) and (0, 2).',
              'Line 2: x_1 + x_2 ≥ 5 defines the half-plane above the line through (5, 0) and (0, 5).',
              'These two half-planes do not intersect anywhere in the first quadrant.',
              'The feasible set is the empty set \\mathcal{F} = \\emptyset.'
            ],
            finalAnswer: 'Infeasible (No solution exists).',
            notes: 'Infeasibility indicates contradictory operational constraints.'
          }
        ],
        commonMistakes: [
          { mistake: 'Forgetting the non-negativity constraints x_1, x_2 ≥ 0.', correction: 'Solutions are strictly confined to the first quadrant unless explicitly specified otherwise.' },
          { mistake: 'Assuming an unbounded feasible region always implies an unbounded solution.', correction: 'If minimization is required or the objective decreases towards the boundary, an unbounded region can still have a finite optimal solution.' }
        ],
        quickRevisionNotes: [
          'Optimal always occurs at a corner point (vertex) of convex feasible region',
          'Multiple optima: objective line is parallel to an active boundary constraint segment',
          'Unbounded: feasible region is open and Z can increase infinitely without restriction',
          'Infeasible: empty feasible region'
        ]
      },
      {
        id: 'u3-simplex-duality',
        unitId: 'unit3',
        title: 'Simplex Algorithm, Tableau Method & Duality',
        subtitle: 'Algebraic pivot steps, optimality criteria, and primal-dual correspondence',
        definition: 'The Simplex algorithm systematically navigates from one Basic Feasible Solution (BFS) to an adjacent BFS along edges of the multidimensional polytope until no further improvement is possible. Slack variables are added for ≤ constraints, surplus and artificial variables for ≥ constraints. In the Simplex tableau, the optimality condition for maximization is net evaluations z_j - c_j ≥ 0 (or c_j - z_j ≤ 0 depending on convention). Every primal LPP has an associated Dual LPP; the Strong Duality Theorem states that if either problem has a finite optimal solution, both do, and their optimal objective values are equal: Max Z = Min W.',
        explanation: 'Simplex moves from one corner point to another by choosing an entering variable (most negative net evaluation, steepest profit rate) and a leaving variable (minimum ratio test: min_{a_{ir} > 0} (b_i / a_{ir})). Duality provides profound economic interpretations: dual variables represent shadow prices (marginal value of resources).',
        formulas: [
          {
            name: 'Standard Form Conversion',
            latex: '\\sum a_{ij} x_j + s_i = b_i \\quad (s_i \\ge 0 \\text{ slack}), \\quad \\sum a_{ij} x_j - s_i + A_i = b_i \\quad (\\text{surplus } s_i, \\text{artificial } A_i)',
            symbols: [
              { symbol: 's_i', meaning: 'Slack variable measuring unused capacity' },
              { symbol: 'A_i', meaning: 'Artificial variable to provide initial basic identity matrix' }
            ]
          },
          {
            name: 'Minimum Ratio Test (Leaving Variable)',
            latex: '\\theta = \\min_{i} \\left\\{ \\frac{b_i}{a_{ir}} \\;\\middle|\\; a_{ir} > 0 \\right\\}',
            symbols: [
              { symbol: 'a_{ir}', meaning: 'Pivot column element in row i' },
              { symbol: 'b_i', meaning: 'Current right-hand side constant' }
            ]
          },
          {
            name: 'Primal-Dual Relationship',
            latex: '\\text{Primal: Max } Z = \\mathbf{c}^T \\mathbf{x}, \\; A\\mathbf{x} \\le \\mathbf{b} \\iff \\text{Dual: Min } W = \\mathbf{b}^T \\mathbf{y}, \\; A^T \\mathbf{y} \\ge \\mathbf{c}',
            symbols: [
              { symbol: '\\mathbf{y}', meaning: 'Vector of dual variables (shadow prices)' },
              { symbol: 'A^T', meaning: 'Transpose of the primal constraint coefficient matrix' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Convert to Standard Form', description: 'Add slack variables s_i ≥ 0 for ≤ constraints to turn inequalities into equalities.' },
          { stepNumber: 2, title: 'Construct Initial Tableau', description: 'Identify basic variables (slacks), read off right-hand side b, and calculate row z_j - c_j.' },
          { stepNumber: 3, title: 'Select Pivot Element', description: 'Entering variable: most negative z_j - c_j. Leaving variable: smallest positive ratio b_i / a_{ir}.' },
          { stepNumber: 4, title: 'Row Operations & Repeat', description: 'Divide pivot row by pivot element. Eliminate pivot column in all other rows. Repeat until all z_j - c_j ≥ 0.' }
        ],
        workedExamples: [
          {
            title: 'Formulating the Dual Problem',
            problem: 'Write the dual of the following primal problem:\nMaximize Z = 3x_1 + 5x_2\nsubject to:\n2x_1 + 3x_2 ≤ 12\n4x_1 + x_2 ≤ 8\nx_1, x_2 ≥ 0.',
            given: 'Primal has 2 variables and 2 constraints. Dual will have 2 variables (y_1, y_2) and 2 constraints.',
            steps: [
              'Primal objective coefficients [3, 5] become the dual right-hand side bounds.',
              'Primal RHS bounds [12, 8] become the dual objective coefficients.',
              'Primal constraint matrix A = [[2, 3], [4, 1]]; Transpose A^T = [[2, 4], [3, 1]].',
              'Dual objective: Minimize W = 12y_1 + 8y_2.',
              'Dual constraints: 2y_1 + 4y_2 ≥ 3 (from x_1 coefficients); 3y_1 + y_2 ≥ 5 (from x_2 coefficients).',
              'Non-negativity: y_1 ≥ 0, y_2 ≥ 0.'
            ],
            finalAnswer: 'Minimize W = 12y_1 + 8y_2 subject to 2y_1 + 4y_2 ≥ 3, 3y_1 + y_2 ≥ 5, y_1, y_2 ≥ 0.',
            notes: 'Max with ≤ constraints corresponds to Min with ≥ constraints.'
          },
          {
            title: 'Simplex Minimum Ratio Test',
            problem: 'In a simplex tableau, pivot column r has elements a_{1r} = 2, a_{2r} = 5, a_{3r} = -1. The current RHS values are b_1 = 10, b_2 = 15, b_3 = 8. Which row leaves the basis?',
            given: 'b = [10, 15, 8], column = [2, 5, -1].',
            steps: [
              'Evaluate ratio b_i / a_{ir} ONLY for positive entries (a_{ir} > 0).',
              'Row 1: 10 / 2 = 5.',
              'Row 2: 15 / 5 = 3.',
              'Row 3: a_{3r} = -1 ≤ 0, so ratio test is not applicable (cannot divide by negative or zero).',
              'The minimum positive ratio is min(5, 3) = 3 (from Row 2).'
            ],
            finalAnswer: 'Row 2 is the pivot row (the basic variable in Row 2 leaves the basis).',
            notes: 'Ignoring negative entries ensures non-negativity of variables in subsequent iterations.'
          }
        ],
        commonMistakes: [
          { mistake: 'Including negative or zero entries when performing the minimum ratio test.', correction: 'Only strictly positive elements a_{ir} > 0 are permitted in ratio calculation.' },
          { mistake: 'Mixing up maximization and minimization optimality criteria.', correction: 'For Max Z with z_j - c_j, optimal when all z_j - c_j ≥ 0. If defined as c_j - z_j, optimal when all ≤ 0.' }
        ],
        quickRevisionNotes: [
          'Pivot column: most negative z_j - c_j (entering variable)',
          'Pivot row: min positive ratio b_i / a_{ir} (leaving variable)',
          'Strong Duality: Max Z* = Min W*',
          'Dual variables = shadow prices'
        ],
        interactiveType: 'simplex'
      },
      {
        id: 'u3-transportation-assignment',
        unitId: 'unit3',
        title: 'Transportation & Assignment Problems',
        subtitle: 'IBFS methods (NWCR, LCM), MODI optimality test, and Hungarian Algorithm',
        definition: 'The Transportation Problem determines the minimum-cost schedule for shipping homogeneous goods from m sources to n destinations. Initial Basic Feasible Solutions (IBFS) are found via North-West Corner Rule (NWCR) or Least Cost Method (LCM). A solution is basic if number of allocated cells equals m + n - 1 with no closed loop. The MODI (u_i + v_j = c_{ij}) method tests optimality; if all opportunity costs d_{ij} = c_{ij} - (u_i + v_j) ≥ 0, the solution is optimal. The Assignment Problem (1-to-1 matching) is solved by the Hungarian Method using row and column reductions.',
        explanation: 'The transportation problem is a special structured LPP. Degeneracy occurs if number of occupied cells < m + n - 1, resolved by placing an infinitesimally small positive allocation ε in an independent unallocated cell. The Hungarian method finds the minimum cost assignment in O(n^3) time by eliminating rows and columns with zeros.',
        formulas: [
          {
            name: 'Balanced Transportation Condition',
            latex: '\\sum_{i=1}^m a_i = \\sum_{j=1}^n b_j \\quad (\\text{Total Supply } = \\text{Total Demand})',
            symbols: [
              { symbol: 'a_i', meaning: 'Supply capacity at origin i' },
              { symbol: 'b_j', meaning: 'Demand requirement at destination j' }
            ]
          },
          {
            name: 'MODI Multipliers (Occupied Cells)',
            latex: 'u_i + v_j = c_{ij} \\quad \\text{for all allocated basic cells}',
            symbols: [
              { symbol: 'u_i', meaning: 'Dual multiplier for origin i (typically set u_1 = 0 initially)' },
              { symbol: 'v_j', meaning: 'Dual multiplier for destination j' },
              { symbol: 'c_{ij}', meaning: 'Unit transportation cost from origin i to destination j' }
            ]
          },
          {
            name: 'MODI Evaluation (Unoccupied Cells)',
            latex: 'd_{ij} = c_{ij} - (u_i + v_j) \\ge 0 \\quad \\text{(Optimality Condition)}',
            symbols: [
              { symbol: 'd_{ij}', meaning: 'Opportunity cost; if all d_{ij} ≥ 0, current schedule is optimal' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Check Balance', description: 'Confirm total supply equals total demand. If unbalanced, introduce a dummy source or destination with zero costs.' },
          { stepNumber: 2, title: 'Compute IBFS', description: 'Use NWCR (start top-left) or Least Cost Method (allocate to cheapest cell repeatedly).' },
          { stepNumber: 3, title: 'Check Degeneracy', description: 'Count occupied cells. Must equal m + n - 1. If less, add ε to an independent position.' },
          { stepNumber: 4, title: 'For Assignment: Hungarian Method', description: 'Row reduction -> Column reduction -> Cover zeros with minimum lines -> If lines = n optimal, else adjust elements.' }
        ],
        workedExamples: [
          {
            title: 'IBFS by North-West Corner Rule (NWCR)',
            problem: 'Find IBFS using NWCR for costs:\nOrigins O1, O2 with supply [30, 50]. Destinations D1, D2 with demand [40, 40]. Costs:\nO1: [3, 1]\nO2: [4, 2].',
            given: 'Supply = 30 + 50 = 80; Demand = 40 + 40 = 80 (Balanced). m = 2, n = 2. Required allocations = 2 + 2 - 1 = 3.',
            steps: [
              'Start at top-left cell (O1, D1): min(Supply 30, Demand 40) = 30.',
              'Allocate 30 to (O1, D1). O1 supply exhausted (0 left). D1 demand remaining = 40 - 30 = 10.',
              'Move down to cell (O2, D1): min(Supply 50, Demand 10) = 10.',
              'Allocate 10 to (O2, D1). D1 satisfied (0 left). O2 supply remaining = 50 - 10 = 40.',
              'Move right to cell (O2, D2): min(Supply 40, Demand 40) = 40.',
              'Allocate 40 to (O2, D2). Both O2 and D2 satisfied.',
              'Total cost = 30*(3) + 10*(4) + 40*(2) = 90 + 40 + 80 = 210.'
            ],
            finalAnswer: 'Total IBFS Cost = 210; Allocations: (O1,D1)=30, (O2,D1)=10, (O2,D2)=40.',
            notes: 'Exactly m + n - 1 = 3 cells allocated, so the solution is non-degenerate.'
          },
          {
            title: 'Hungarian Method Row & Column Reduction',
            problem: 'Perform row and column reductions on the 3x3 cost matrix: [[9, 2, 7], [6, 4, 3], [5, 8, 1]].',
            given: '3x3 cost matrix.',
            steps: [
              'Step 1: Row Reduction (subtract minimum element of each row from that row):',
              'Row 1 min = 2: [9-2, 2-2, 7-2] = [7, 0, 5].',
              'Row 2 min = 3: [6-3, 4-3, 3-3] = [3, 1, 0].',
              'Row 3 min = 1: [5-1, 8-1, 1-1] = [4, 7, 0].',
              'Matrix after row reduction: [[7, 0, 5], [3, 1, 0], [4, 7, 0]].',
              'Step 2: Column Reduction (subtract minimum element of each column):',
              'Col 1 min = 3: [7-3, 3-3, 4-3] = [4, 0, 1].',
              'Col 2 min = 0: [0, 1, 7] (unchanged).',
              'Col 3 min = 0: [5, 0, 0] (unchanged).',
              'Final reduced matrix: [[4, 0, 5], [0, 1, 0], [1, 7, 0]].'
            ],
            finalAnswer: 'Reduced cost matrix: [[4, 0, 5], [0, 1, 0], [1, 7, 0]].',
            notes: 'Each row and column now contains at least one zero for assignment selection.'
          }
        ],
        commonMistakes: [
          { mistake: 'Forgetting to balance the problem before allocating supplies and demands.', correction: 'Always check if total supply equals total demand; add dummy if needed.' },
          { mistake: 'Ignoring degeneracy in MODI method when allocations < m + n - 1.', correction: 'Without m + n - 1 allocations, you cannot determine all u_i and v_j uniquely.' }
        ],
        quickRevisionNotes: [
          'Non-degenerate basic solution has exactly m + n - 1 allocations',
          'NWCR: allocates top-left corner sequentially',
          'Least Cost: prioritizes smallest cost cells first',
          'MODI optimality: all d_ij = c_ij - (u_i + v_j) >= 0',
          'Hungarian method: solves 1-to-1 matching via row/col reduction'
        ],
        interactiveType: 'transportation'
      },
      {
        id: 'u3-game-theory',
        unitId: 'unit3',
        title: 'Game Theory: Two-Person Zero-Sum Games',
        subtitle: 'Saddle points, pure & mixed strategies, dominance principle, and graphical solutions',
        definition: 'A two-person zero-sum game is a competitive situation where one player\'s gain is precisely the other player\'s loss (total payoff = 0). The payoff matrix shows gains for Player A (maximizing player) and losses for Player B (minimizing player). By the Minimax Principle, Player A maximizes their minimum guaranteed payoff (Maximin), while Player B minimizes Player A\'s maximum payoff (Minimax). If Maximin = Minimax, a Saddle Point exists and the game has a Pure Strategy solution. Otherwise, players adopt Mixed Strategies using probabilities. Dominance Principle reduces matrix size by eliminating strictly inferior rows or columns.',
        explanation: 'A row is dominated if all its entries are ≤ another row (Player A never plays it). A column is dominated if all its entries are ≥ another column (Player B never pays more when a cheaper option exists). 2xn or mx2 games without saddle points can be solved geometrically using the Graphical Method.',
        formulas: [
          {
            name: 'Maximin & Minimax (Saddle Point Condition)',
            latex: '\\max_i (\\min_j a_{ij}) = \\min_j (\\max_i a_{ij}) = V \\quad (\\text{Value of the Game})',
            symbols: [
              { symbol: 'V', meaning: 'Value of the game; fair game if V = 0' },
              { symbol: '\\min_j a_{ij}', meaning: 'Row minima (worst-case return for Player A choosing strategy i)' },
              { symbol: '\\max_i a_{ij}', meaning: 'Column maxima (maximum loss Player B might concede for strategy j)' }
            ]
          },
          {
            name: '2x2 Mixed Strategy Formulas',
            latex: 'p_1 = \\frac{a_{22} - a_{21}}{(a_{11} + a_{22}) - (a_{12} + a_{21})}, \\quad V = \\frac{a_{11} a_{22} - a_{12} a_{21}}{(a_{11} + a_{22}) - (a_{12} + a_{21})}',
            symbols: [
              { symbol: 'p_1', meaning: 'Probability Player A plays strategy 1 (p_2 = 1 - p_1)' },
              { symbol: 'V', meaning: 'Expected value of the game under mixed strategies' }
            ]
          },
          {
            name: 'Dominance Principle',
            latex: '\\text{Row } r_1 \\text{ dominates } r_2 \\text{ if } a_{1j} \\ge a_{2j} \\;\\forall j; \\quad \\text{Col } c_1 \\text{ dominates } c_2 \\text{ if } a_{i1} \\le a_{i2} \\;\\forall i',
            symbols: [
              { symbol: 'r_2', meaning: 'Inferior row deleted for Player A' },
              { symbol: 'c_2', meaning: 'More expensive column deleted for Player B' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Check for Saddle Point', description: 'Write down row minima and column maxima. Check if max(row minima) = min(col maxima).' },
          { stepNumber: 2, title: 'If Saddle Point Exists', description: 'State pure strategies and Value of Game V = entry at saddle point.' },
          { stepNumber: 3, title: 'Apply Dominance Principle', description: 'Eliminate dominated rows (smaller or equal) and dominated columns (larger or equal).' },
          { stepNumber: 4, title: 'Solve Reduced Matrix', description: 'For 2x2, apply analytical probability formulas; for 2xn or mx2, graph lines against probability p.' }
        ],
        workedExamples: [
          {
            title: 'Finding Saddle Point in 3x3 Game',
            problem: 'Determine whether a saddle point exists for the payoff matrix:\nPlayer A \\ B: [B1, B2, B3]\nA1: [3, 2, 5]\nA2: [4, 3, 6]\nA3: [1, 0, 2]. Find the value of the game.',
            given: 'Matrix 3x3.',
            steps: [
              'Calculate Row Minima for Player A:',
              'Row 1 min: min(3, 2, 5) = 2.',
              'Row 2 min: min(4, 3, 6) = 3.',
              'Row 3 min: min(1, 0, 2) = 0.',
              'Maximin = max(2, 3, 0) = 3 (Row 2).',
              'Calculate Column Maxima for Player B:',
              'Col 1 max: max(3, 4, 1) = 4.',
              'Col 2 max: max(2, 3, 0) = 3.',
              'Col 3 max: max(5, 6, 2) = 6.',
              'Minimax = min(4, 3, 6) = 3 (Col 2).',
              'Since Maximin = Minimax = 3, a saddle point exists at position (A2, B2).'
            ],
            finalAnswer: 'Saddle point at (A2, B2); Optimal strategies: Player A plays A2, Player B plays B2; Game Value V = 3.',
            notes: 'Both players stick to pure strategies because neither can unilaterally improve their payoff.'
          },
          {
            title: '2x2 Mixed Strategy Solution',
            problem: 'Find the optimal mixed strategy and value of the game for the payoff matrix [[5, 1], [3, 4]].',
            given: 'No saddle point: Row min = [1, 3] => Maximin = 3. Col max = [5, 4] => Minimax = 4. 3 ≠ 4.',
            steps: [
              'Let a_11 = 5, a_12 = 1, a_21 = 3, a_22 = 4.',
              'Denominator: (a_11 + a_22) - (a_12 + a_21) = (5 + 4) - (1 + 3) = 9 - 4 = 5.',
              'Numerator for p_1: a_22 - a_21 = 4 - 3 = 1.',
              'p_1 = 1 / 5 = 0.2; p_2 = 1 - 0.2 = 0.8.',
              'Numerator for q_1: a_22 - a_12 = 4 - 1 = 3.',
              'q_1 = 3 / 5 = 0.6; q_2 = 1 - 0.6 = 0.4.',
              'Value of game: V = (a_11 * a_22 - a_12 * a_21) / Denominator = (5*4 - 1*3) / 5 = (20 - 3) / 5 = 17 / 5 = 3.4.'
            ],
            finalAnswer: 'Player A: (0.2, 0.8); Player B: (0.6, 0.4); Value of Game V = 3.4.',
            notes: 'Check: V lies between Maximin (3) and Minimax (4). 3 <= 3.4 <= 4. Confirmed!'
          }
        ],
        commonMistakes: [
          { mistake: 'Deleting columns that are SMALLER when applying dominance.', correction: 'Player B wants to minimize payments, so Player B eliminates LARGER columns (higher cost).' },
          { mistake: 'Confusing fair game with zero-sum game.', correction: 'A zero-sum game is fair if and only if its value V = 0.' }
        ],
        quickRevisionNotes: [
          'Saddle point exists if Maximin = Minimax',
          'Value V = payoff at saddle point',
          'Row dominance: delete row with <= entries (inferior for A)',
          'Column dominance: delete col with >= entries (inferior for B)',
          'Fair game: V = 0'
        ]
      }
    ]
  },
  {
    id: 'unit4',
    number: 4,
    title: 'Lattices & Boolean Algebra',
    tagline: 'Order theory, POSETs, algebraic structures, Stone representation, and logic circuits',
    description: 'Master partially ordered sets (POSETs), Hasse diagrams, lattice axioms, completeness, modular and distributive lattices, Boolean algebra laws, irreducibles, atoms, Stone\'s Representation Theorem, and switching circuit simplification.',
    iconName: 'Network',
    color: 'from-amber-600 to-orange-600',
    topics: [
      {
        id: 'u4-posets-hasse',
        unitId: 'unit4',
        title: 'Relations, POSETs & Hasse Diagrams',
        subtitle: 'Order relations, maximal/minimal elements, bounds, and visual DAG representations',
        definition: 'A relation R on set P is a Partial Order if it is Reflexive (a R a), Antisymmetric (a R b and b R a => a = b), and Transitive (a R b and b R c => a R c). The pair (P, ≤) is called a POSET (Partially Ordered Set). A Hasse diagram is a directed graph where loops (reflexivity) and redundant transitive edges are omitted, and edges are drawn upward to indicate order (x < y). Elements can be maximal, minimal, greatest (maximum), or least (minimum).',
        explanation: 'Unlike a total order (where any two elements can be compared, like real numbers), elements in a POSET can be incomparable (e.g. subsets {1} and {2} in power set P({1, 2})). A greatest element must be comparable and ≥ ALL elements; a maximal element simply has no element strictly greater than it.',
        formulas: [
          {
            name: 'Partial Order Axioms',
            latex: '\\forall a, b, c \\in P: \\; (a \\le a), \\quad (a \\le b \\land b \\le a \\implies a = b), \\quad (a \\le b \\land b \\le c \\implies a \\le c)',
            symbols: [
              { symbol: 'a \\le a', meaning: 'Reflexivity' },
              { symbol: 'a \\le b \\land b \\le a \\implies a = b', meaning: 'Antisymmetry' },
              { symbol: 'a \\le b \\land b \\le c \\implies a \\le c', meaning: 'Transitivity' }
            ]
          },
          {
            name: 'Divisibility POSET (D_n)',
            latex: 'D_n = \\{ d \\in \\mathbb{Z}^+ \\mid d \\text{ divides } n \\}, \\quad a \\le b \\iff a \\mid b',
            symbols: [
              { symbol: 'a \\mid b', meaning: 'a divides b with zero remainder' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Identify Ordering Relation', description: 'Common examples: subset inclusion ⊆ on \\mathcal{P}(S), divisibility | on integers, standard ≤ on numbers.' },
          { stepNumber: 2, title: 'Find Covering Relations', description: 'y covers x (x ≺ y) if x < y and no z exists such that x < z < y.' },
          { stepNumber: 3, title: 'Draw Hasse Diagram', description: 'Place minimal elements at bottom. Draw an upward edge between x and y whenever y covers x.' },
          { stepNumber: 4, title: 'Identify Extremal Elements', description: 'Top elements with no upward edges are maximal. If unique and comparable to all, it is the Greatest.' }
        ],
        workedExamples: [
          {
            title: 'Hasse Diagram of Divisors of 12 (D_12)',
            problem: 'Construct the POSET (D_12, |) where D_12 = {1, 2, 3, 4, 6, 12}. Identify covers, minimal, maximal, greatest, and least elements.',
            given: 'Divisibility relation a | b.',
            steps: [
              'List covers (direct immediate divisor relationships with no intermediary):',
              '1 is covered by 2 and 3 (1 ≺ 2, 1 ≺ 3).',
              '2 is covered by 4 and 6 (2 ≺ 4, 2 ≺ 6).',
              '3 is covered by 6 (3 ≺ 6).',
              '4 is covered by 12 (4 ≺ 12); 6 is covered by 12 (6 ≺ 12).',
              'Notice 2 and 3 are incomparable (neither divides the other).',
              'Bottom element = 1 (divides everything => Least element and unique Minimal).',
              'Top element = 12 (divided by everything => Greatest element and unique Maximal).'
            ],
            finalAnswer: 'Covers: (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12). Least = 1, Greatest = 12.',
            notes: 'Transitive edges (e.g. 1 to 4 or 1 to 12) are omitted in Hasse diagrams.'
          },
          {
            title: 'Maximal vs Greatest in Incomparable Sets',
            problem: 'Consider set S = {2, 3, 4, 6} under divisibility |. Find all maximal, minimal, greatest, and least elements.',
            given: 'S = {2, 3, 4, 6}.',
            steps: [
              'Minimal elements: 2 and 3 (no element in S divides 2 or 3).',
              'Because there are two distinct minimal elements, there is NO Least element.',
              'Maximal elements: 4 and 6 (neither 4 nor 6 divides any other element in S).',
              'Because there are two distinct maximal elements, there is NO Greatest element.'
            ],
            finalAnswer: 'Minimal: {2, 3}; Maximal: {4, 6}; Least: None; Greatest: None.',
            notes: 'A POSET may have multiple maximal/minimal elements, but at most ONE greatest/least element.'
          }
        ],
        commonMistakes: [
          { mistake: 'Drawing redundant transitive lines in a Hasse diagram.', correction: 'If x ≺ y and y ≺ z, never draw a direct edge between x and z.' },
          { mistake: 'Confusing maximal with greatest.', correction: 'Greatest must be greater than every other element; maximal just has nothing above it.' }
        ],
        quickRevisionNotes: [
          'Partial Order: Reflexive, Antisymmetric, Transitive',
          'Covers: immediate predecessor without intermediate',
          'Greatest/Least is unique if it exists',
          'Multiple maximal/minimal can exist simultaneously'
        ],
        interactiveType: 'hasse'
      },
      {
        id: 'u4-lattices-structure',
        unitId: 'unit4',
        title: 'Lattices as POSETs & Algebraic Properties',
        subtitle: 'GLB (meet ∧), LUB (join ∨), sublattices, completeness, and homomorphisms',
        definition: 'A POSET (L, ≤) is a Lattice if every pair of elements {a, b} has a unique Greatest Lower Bound (GLB or meet a ∧ b) and a unique Least Upper Bound (LUB or join a ∨ b). Algebraically, a lattice is an algebraic system (L, ∧, ∨) satisfying Commutativity, Associativity, Idempotency, and Absorption laws. A Complete Lattice is one where every subset (finite or infinite) has both a supremum and infimum, possessing universal bounds 0 (least) and 1 (greatest).',
        explanation: 'In the divisor lattice (D_n, |), meet corresponds to Greatest Common Divisor: a ∧ b = gcd(a, b), and join corresponds to Least Common Multiple: a ∨ b = lcm(a, b). In subset lattices (\\mathcal{P}(S), ⊆), meet is intersection A ∩ B and join is union A ∪ B.',
        formulas: [
          {
            name: 'Absorption Laws',
            latex: 'a \\land (a \\lor b) = a, \\quad a \\lor (a \\land b) = a',
            symbols: [
              { symbol: '\\land', meaning: 'Meet operation (infimum / GLB)' },
              { symbol: '\\lor', meaning: 'Join operation (supremum / LUB)' }
            ]
          },
          {
            name: 'Idempotent, Commutative & Associative Laws',
            latex: 'a \\land a = a, \\quad a \\land b = b \\land a, \\quad a \\land (b \\land c) = (a \\land b) \\land c',
            symbols: [
              { symbol: 'a, b, c \\in L', meaning: 'Elements of the lattice' }
            ]
          },
          {
            name: 'Consistency Property',
            latex: 'a \\le b \\iff a \\land b = a \\iff a \\lor b = b',
            symbols: [
              { symbol: 'a \\le b', meaning: 'Partial order equivalent to algebraic meet/join identities' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Verify Lattice Condition', description: 'For every pair of elements, check if a unique GLB and unique LUB exist.' },
          { stepNumber: 2, title: 'Find Sublattices', description: 'A subset S ⊆ L is a sublattice if it is closed under the SAME meet and join operations.' },
          { stepNumber: 3, title: 'Check Completeness', description: 'Every finite lattice is automatically complete; infinite lattices require arbitrary inf/sup.' },
          { stepNumber: 4, title: 'Lattice Homomorphism', description: 'Check f(a ∧ b) = f(a) ∧ f(b) and f(a ∨ b) = f(a) ∨ f(b).' }
        ],
        workedExamples: [
          {
            title: 'Is Non-Diamond POSET a Lattice?',
            problem: 'Consider the POSET with elements {0, a, b, c, 1} where 0 ≤ a, b, c ≤ 1, but a, b, c are mutually incomparable. Is this a lattice?',
            given: 'Five elements arranged with 0 at bottom, 1 at top, and three parallel middle nodes.',
            steps: [
              'Check meet and join for all pairs:',
              'For any pair of middle nodes, say {a, b}:',
              'Lower bounds of {a, b} are {0}. GLB(a, b) = 0 (unique).',
              'Upper bounds of {a, b} are {1}. LUB(a, b) = 1 (unique).',
              'This holds for {a, c} and {b, c} as well.',
              'Every pair has a unique GLB and unique LUB.',
              'Therefore, this is a lattice (the modular lattice M_3).'
            ],
            finalAnswer: 'Yes, it is a lattice (specifically known as the diamond lattice M_3).',
            notes: 'M_3 is modular but not distributive.'
          },
          {
            title: 'Meet and Join in Divisor Lattice D_30',
            problem: 'In the divisor lattice (D_30, |), evaluate (6 ∧ 10) ∨ (15 ∧ 10).',
            given: 'In divisibility lattice: ∧ = gcd, ∨ = lcm.',
            steps: [
              'Evaluate first meet: 6 ∧ 10 = gcd(6, 10) = 2.',
              'Evaluate second meet: 15 ∧ 10 = gcd(15, 10) = 5.',
              'Evaluate outer join: 2 ∨ 5 = lcm(2, 5) = 10.'
            ],
            finalAnswer: '10.',
            notes: 'D_30 is isomorphic to the Boolean algebra B_3 since 30 = 2 * 3 * 5 is square-free.'
          }
        ],
        commonMistakes: [
          { mistake: 'Assuming any subset of a lattice that forms a lattice on its own is a sublattice.', correction: 'A sublattice must preserve the ORIGINAL parent lattice meet and join operations, not redefine them.' },
          { mistake: 'Thinking every bounded lattice is distributive.', correction: 'M_3 and N_5 are bounded lattices that fail the distributive property.' }
        ],
        quickRevisionNotes: [
          'Lattice: unique GLB (meet) and LUB (join) for every pair',
          'Algebraic laws: Commutative, Associative, Idempotent, Absorption',
          'a <= b <=> a ^ b = a <=> a v b = b',
          'Every finite lattice has least bound 0 and greatest bound 1'
        ]
      },
      {
        id: 'u4-distributive-complemented',
        unitId: 'unit4',
        title: 'Distributive, Modular & Complemented Lattices',
        subtitle: 'Distributivity tests, complement uniqueness, and the forbidden N_5 and M_3 sublattices',
        definition: 'A lattice is Distributive if meet distributes over join: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c) for all a, b, c (or equivalently join over meet). By Birkhoff\'s Theorem, a lattice is distributive if and only if it contains neither the pentagon lattice N_5 nor the diamond lattice M_3 as a sublattice. A bounded lattice (with 0 and 1) is Complemented if every element a has a complement a\' such that a ∧ a\' = 0 and a ∨ a\' = 1. In a distributive lattice, complements are unique if they exist.',
        explanation: 'Distributivity is a strict property. The pentagon N_5 is non-modular, and M_3 is modular but non-distributive. If a lattice is both distributive AND complemented, it is by definition a Boolean Algebra.',
        formulas: [
          {
            name: 'Distributive Laws',
            latex: 'a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c), \\quad a \\lor (b \\land c) = (a \\lor b) \\land (a \\lor c)',
            symbols: [
              { symbol: 'a, b, c', meaning: 'Any three elements in the lattice' }
            ]
          },
          {
            name: 'Complement Definition',
            latex: 'a \\land a\' = 0 \\quad \\text{and} \\quad a \\lor a\' = 1',
            symbols: [
              { symbol: 'a\'', meaning: 'Complement of element a' },
              { symbol: '0', meaning: 'Universal least element' },
              { symbol: '1', meaning: 'Universal greatest element' }
            ]
          },
          {
            name: 'Modular Law',
            latex: 'a \\le c \\implies a \\lor (b \\land c) = (a \\lor b) \\land c',
            symbols: [
              { symbol: 'a \\le c', meaning: 'Condition under which modular identity holds' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Check Birkhoff Criterion', description: 'Inspect Hasse diagram for embedded pentagon (N_5) or diamond (M_3) sublattices.' },
          { stepNumber: 2, title: 'Test Distributivity Equations', description: 'Pick test elements and verify if a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c).' },
          { stepNumber: 3, title: 'Search for Complements', description: 'For each element x, search for an element y such that x ∧ y = 0 and x ∨ y = 1.' },
          { stepNumber: 4, title: 'Verify Uniqueness', description: 'If any element has multiple distinct complements, the lattice cannot be distributive.' }
        ],
        workedExamples: [
          {
            title: 'Failure of Distributivity in N_5 (Pentagon Lattice)',
            problem: 'The pentagon lattice N_5 consists of {0, a, b, c, 1} with c ≤ a, and b incomparable to both a and c. Show that N_5 is not distributive.',
            given: 'c < a; b is incomparable to a and c.',
            steps: [
              'Evaluate LHS: b ∨ (c ∧ a).',
              'Since c ≤ a, c ∧ a = c. Therefore, b ∨ (c ∧ a) = b ∨ c = 1 (since top is 1).',
              'Evaluate RHS: (b ∨ c) ∧ (b ∨ a).',
              'b ∨ c = 1, and b ∨ a = 1. So RHS = 1 ∧ 1 = 1.',
              'Now test the dual form: a ∧ (b ∨ c).',
              'b ∨ c = 1, so a ∧ (b ∨ c) = a ∧ 1 = a.',
              'Now evaluate (a ∧ b) ∨ (a ∧ c):',
              'a ∧ b = 0 (bottom is 0), and a ∧ c = c (since c ≤ a).',
              'So (a ∧ b) ∨ (a ∧ c) = 0 ∨ c = c.',
              'Notice LHS = a, but RHS = c. Since c < a, LHS ≠ RHS!'
            ],
            finalAnswer: 'a ∧ (b ∨ c) = a ≠ c = (a ∧ b) ∨ (a ∧ c). Thus N_5 is not distributive.',
            notes: 'N_5 is the classic counterexample demonstrating non-modularity and non-distributivity.'
          },
          {
            title: 'Is D_12 Complemented?',
            problem: 'In the divisor lattice (D_12, |) with elements {1, 2, 3, 4, 6, 12}, determine whether 2 has a complement.',
            given: '0 = 1, 1 = 12. A complement x must satisfy gcd(2, x) = 1 and lcm(2, x) = 12.',
            steps: [
              'Condition 1: gcd(2, x) = 1 => x must be coprime to 2. In D_12, only 1 and 3 are coprime to 2.',
              'Test x = 1: gcd(2, 1) = 1, but lcm(2, 1) = 2 ≠ 12. Not a complement.',
              'Test x = 3: gcd(2, 3) = 1, but lcm(2, 3) = 6 ≠ 12. Not a complement.',
              'No other element in D_12 satisfies both conditions.'
            ],
            finalAnswer: 'Element 2 has no complement. Therefore D_12 is NOT a complemented lattice.',
            notes: 'For D_n to be complemented, n must be square-free (no repeated prime factors).'
          }
        ],
        commonMistakes: [
          { mistake: 'Assuming that every lattice with a 0 and 1 is complemented.', correction: 'Most bounded lattices are NOT complemented (e.g. chains of length ≥ 3).' },
          { mistake: 'Believing an element can have multiple complements in a distributive lattice.', correction: 'In a distributive lattice, if a complement exists, it is strictly unique.' }
        ],
        quickRevisionNotes: [
          'Distributive <=> No N5 and no M3 sublattices (Birkhoff)',
          'Complemented: every element has at least one complement x\'',
          'In distributive lattices, complements are unique',
          'Boolean algebra = Distributive + Complemented lattice'
        ]
      },
      {
        id: 'u4-boolean-algebra-stone',
        unitId: 'unit4',
        title: 'Boolean Algebra, Atoms & Stone\'s Representation Theorem',
        subtitle: 'Axioms, join-irreducibles, atoms, and isomorphism to power sets',
        definition: 'A Boolean Algebra is a complemented distributive lattice (B, ∧, ∨, \', 0, 1). An element a > 0 is an Atom if no element x exists with 0 < x < a (i.e. a covers 0). An element is Join-Irreducible if it cannot be written as a join of strictly smaller elements. Stone\'s Representation Theorem states that every finite Boolean algebra is isomorphic to the power set \\mathcal{P}(A) of its atoms. Consequently, the cardinality of every finite Boolean algebra is a power of 2: |B| = 2^k, where k is the number of atoms.',
        explanation: 'De Morgan\'s laws (a ∧ b)\' = a\' ∨ b\' and (a ∨ b)\' = a\' ∧ b\' govern Boolean dualities. Stone\'s theorem is profound: it reveals that every finite Boolean algebra, no matter how abstractly defined, is structurally identical to subsets of a finite set under intersection and union.',
        formulas: [
          {
            name: 'De Morgan\'s Laws',
            latex: '(a \\land b)\' = a\' \\lor b\', \\quad (a \\lor b)\' = a\' \\land b\'',
            symbols: [
              { symbol: 'a\'', meaning: 'Unique Boolean complement (negation)' }
            ]
          },
          {
            name: 'Atomicity & Representation Formula',
            latex: '|B| = 2^k \\quad (k = |\\text{Atoms}(B)|), \\quad x = \\bigvee \\{ a \\in \\text{Atoms}(B) \\mid a \\le x \\}',
            symbols: [
              { symbol: 'k', meaning: 'Number of atoms in the Boolean algebra' },
              { symbol: 'x', meaning: 'Every element is the unique join of the atoms below it' }
            ]
          },
          {
            name: 'Stone\'s Representation Theorem',
            latex: 'B \\cong \\mathcal{P}(\\text{Atoms}(B))',
            symbols: [
              { symbol: '\\cong', meaning: 'Isomorphism between Boolean algebra and power set' }
            ]
          }
        ],
        stepByStepMethod: [
          { stepNumber: 1, title: 'Find Universal Zero and One', description: 'Locate 0 (least) and 1 (greatest).' },
          { stepNumber: 2, title: 'Identify Atoms', description: 'Find all elements that directly cover 0 (nodes at the lowest level immediately above 0).' },
          { stepNumber: 3, title: 'Verify Element Count', description: 'Count atoms k. Check if total elements |B| = 2^k.' },
          { stepNumber: 4, title: 'Express as Join of Atoms', description: 'For any element x, find all atoms a_i ≤ x; then x = a_1 ∨ a_2 ∨ ... ∨ a_r.' }
        ],
        workedExamples: [
          {
            title: 'Atoms and Structure of D_70',
            problem: 'Consider the divisibility lattice D_70 = {1, 2, 5, 7, 10, 14, 35, 70}. Is D_70 a Boolean algebra? Find its atoms and verify Stone\'s theorem.',
            given: '70 = 2 * 5 * 7 (product of 3 distinct primes).',
            steps: [
              'Total elements = (1+1)(1+1)(1+1) = 8 elements.',
              'Bottom element 0 = 1, Top element 1 = 70.',
              'Atoms are elements covering 1 (immediate prime divisors): {2, 5, 7}.',
              'Number of atoms k = 3.',
              'By Stone\'s Theorem, |B| = 2^k = 2^3 = 8. This matches |D_70| = 8.',
              'Since 70 is square-free, every element has a unique complement: e.g. complement of 10 is 70/10 = 7 (gcd(10, 7) = 1, lcm(10, 7) = 70).',
              'D_70 is distributive and complemented.'
            ],
            finalAnswer: 'D_70 is a Boolean algebra with atoms {2, 5, 7}, isomorphic to P({2, 5, 7}).',
            notes: 'Any divisor lattice D_n is a Boolean algebra if and only if n is square-free.'
          },
          {
            title: 'Simplifying a Boolean Expression using Axioms',
            problem: 'Simplify the Boolean expression: f = (x ∧ y) ∨ (x ∧ y\') ∨ (x\' ∧ y).',
            given: 'Three minterms in variables x and y.',
            steps: [
              'Combine first two terms using distributivity: (x ∧ y) ∨ (x ∧ y\') = x ∧ (y ∨ y\').',
              'By complement law, y ∨ y\' = 1. So x ∧ 1 = x.',
              'Expression becomes: x ∨ (x\' ∧ y).',
              'Apply distributive law of ∨ over ∧: (x ∨ x\') ∧ (x ∨ y).',
              'By complement law, x ∨ x\' = 1. So 1 ∧ (x ∨ y) = x ∨ y.'
            ],
            finalAnswer: 'x ∨ y.',
            notes: 'Corresponds to standard logic gate OR simplification: xy + xy\' + x\'y = x + y.'
          }
        ],
        commonMistakes: [
          { mistake: 'Claiming that a set with 6 elements can be a Boolean algebra.', correction: 'By Stone\'s theorem, every finite Boolean algebra MUST have 2^k elements (1, 2, 4, 8, 16, 32...). 6 is impossible.' },
          { mistake: 'Counting 0 as an atom.', correction: 'An atom must be strictly greater than 0; an atom covers 0.' }
        ],
        quickRevisionNotes: [
          'Finite Boolean algebra size is ALWAYS a power of 2: |B| = 2^k',
          'Atoms: elements that cover 0',
          'Stone\'s Theorem: B is isomorphic to P(Atoms)',
          'De Morgan: (a ^ b)\' = a\' v b\', (a v b)\' = a\' ^ b\''
        ],
        interactiveType: 'truth-table'
      }
    ]
  }
];
