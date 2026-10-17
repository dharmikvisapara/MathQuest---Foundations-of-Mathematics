import { FormulaEntry } from '../types';

export const FORMULA_LIBRARY: FormulaEntry[] = [
  // UNIT 1: Combinatorics
  {
    id: 'f-perm-distinct',
    unitId: 'unit1',
    topic: 'Permutations without Repetition',
    name: 'r-Permutations of n Distinct Elements',
    latex: 'P(n, r) = {}^n P_r = \\frac{n!}{(n - r)!}',
    symbols: [
      { symbol: 'n', meaning: 'Total number of distinct elements' },
      { symbol: 'r', meaning: 'Number of elements selected in order (0 ≤ r ≤ n)' },
      { symbol: 'n!', meaning: 'Factorial: n × (n - 1) × ... × 1' }
    ],
    description: 'Calculates the number of ordered arrangements of r elements chosen from n distinct objects.',
    usageNotes: 'Order matters. When r = n, P(n, n) = n!.',
    tags: ['permutations', 'counting', 'arrangements', 'factorials']
  },
  {
    id: 'f-comb-distinct',
    unitId: 'unit1',
    topic: 'Combinations and Related Identities',
    name: 'Combinations Formula (Binomial Coefficient)',
    latex: 'C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}',
    symbols: [
      { symbol: 'n', meaning: 'Total number of distinct items' },
      { symbol: 'r', meaning: 'Number of items chosen without regard to order' }
    ],
    description: 'Calculates the number of ways to choose r elements from a set of n elements where order is disregarded.',
    usageNotes: 'Symmetry property: C(n, r) = C(n, n - r).',
    tags: ['combinations', 'selection', 'binomial coefficient', 'subsets']
  },
  {
    id: 'f-pascal-identity',
    unitId: 'unit1',
    topic: 'Combinations and Related Identities',
    name: 'Pascal\'s Recurrence Identity',
    latex: '\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}',
    symbols: [
      { symbol: 'n, r', meaning: 'Positive integers with 1 ≤ r ≤ n - 1' }
    ],
    description: 'Relates entries in Pascal\'s triangle: each element is the sum of the two directly above it.',
    usageNotes: 'Combinatorial proof: partition selections into those containing a specific element vs those not containing it.',
    tags: ['pascal', 'identity', 'recurrence', 'binomial']
  },
  {
    id: 'f-binomial-theorem',
    unitId: 'unit1',
    topic: 'Binomial Theorem and Pascal\'s Triangle',
    name: 'The Binomial Theorem',
    latex: '(x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n - k} y^k',
    symbols: [
      { symbol: 'n', meaning: 'Non-negative integer power' },
      { symbol: '\\binom{n}{k}', meaning: 'Binomial coefficient of the k-th term' }
    ],
    description: 'Expands powers of a binomial sum into an explicit polynomial series.',
    usageNotes: 'General (k+1)-th term is T_{k+1} = C(n, k) * x^{n-k} * y^k.',
    tags: ['binomial', 'expansion', 'algebra', 'polynomials']
  },
  {
    id: 'f-pigeonhole-gen',
    unitId: 'unit1',
    topic: 'Pigeonhole Principle',
    name: 'Generalized Pigeonhole Principle Bound',
    latex: 'm \\ge \\left\\lceil \\frac{N}{k} \\right\\rceil',
    symbols: [
      { symbol: 'N', meaning: 'Number of items (pigeons)' },
      { symbol: 'k', meaning: 'Number of boxes (pigeonholes)' },
      { symbol: '\\lceil \\cdot \\rceil', meaning: 'Ceiling function' }
    ],
    description: 'Guarantees that at least one container must contain at least ceil(N/k) items when N items are distributed into k containers.',
    usageNotes: 'Minimum items needed to ensure at least m in a container: N = k(m - 1) + 1.',
    tags: ['pigeonhole', 'bounds', 'extremal', 'proofs']
  },
  {
    id: 'f-derangements',
    unitId: 'unit1',
    topic: 'Derangements and Applications',
    name: 'Derangement Closed Formula',
    latex: 'D_n = !n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = n! \\left( 1 - \\frac{1}{1!} + \\frac{1}{2!} - \\dots + \\frac{(-1)^n}{n!} \\right)',
    symbols: [
      { symbol: 'D_n', meaning: 'Number of permutations of n elements with no fixed points' },
      { symbol: 'e', meaning: 'Euler\'s constant: D_n ≈ round(n! / e)' }
    ],
    description: 'Counts permutations where every single element is displaced from its original position.',
    usageNotes: 'Recursive relation: D_n = (n - 1)(D_{n-1} + D_{n-2}) with D_1 = 0, D_2 = 1.',
    tags: ['derangements', 'permutations', 'pie', 'fixed points']
  },
  {
    id: 'f-stars-bars',
    unitId: 'unit1',
    topic: 'Counting with Repetition and Multisets',
    name: 'Stars & Bars (Non-Negative Integer Solutions)',
    latex: '\\binom{n + r - 1}{r} = \\binom{n + r - 1}{n - 1}',
    symbols: [
      { symbol: 'r', meaning: 'Number of identical objects to distribute' },
      { symbol: 'n', meaning: 'Number of distinct categories or bins' }
    ],
    description: 'Counts the number of non-negative integer solutions to x_1 + x_2 + ... + x_n = r with x_i ≥ 0.',
    usageNotes: 'If x_i ≥ 1 (positive integers), the formula simplifies to C(r - 1, n - 1).',
    tags: ['stars and bars', 'multisets', 'distributions', 'partitions']
  },
  {
    id: 'f-ogf-geometric',
    unitId: 'unit1',
    topic: 'Generating Functions and Applications',
    name: 'Ordinary Generating Function of Geometric Series',
    latex: '\\frac{1}{1 - ax} = \\sum_{n=0}^\\infty a^n x^n',
    symbols: [
      { symbol: 'a', meaning: 'Base constant of geometric progression' },
      { symbol: 'x', meaning: 'Formal variable' }
    ],
    description: 'Closed-form rational function representing the infinite sequence 1, a, a^2, a^3, ...',
    usageNotes: 'Derivative yields 1 / (1 - x)^2 = sum_{n=0}^inf (n + 1) x^n.',
    tags: ['generating functions', 'sequences', 'series', 'recurrence']
  },

  // UNIT 2: Numerical Methods
  {
    id: 'f-errors-rel',
    unitId: 'unit2',
    topic: 'Absolute, Relative & Percentage Errors',
    name: 'Relative and Percentage Error',
    latex: 'E_r = \\frac{|X - X_a|}{|X|}, \\quad E_p = E_r \\times 100\\%',
    symbols: [
      { symbol: 'X', meaning: 'True exact value (non-zero)' },
      { symbol: 'X_a', meaning: 'Approximated value' },
      { symbol: 'E_r', meaning: 'Relative error' },
      { symbol: 'E_p', meaning: 'Percentage error' }
    ],
    description: 'Normalizes the absolute deviation against the true magnitude of the measured quantity.',
    usageNotes: 'Relative error is dimensionless and scale-invariant.',
    tags: ['error analysis', 'numerical', 'precision', 'approximation']
  },
  {
    id: 'f-newton-raphson',
    unitId: 'unit2',
    topic: 'Newton-Raphson Method',
    name: 'Newton-Raphson Iteration Formula',
    latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}',
    symbols: [
      { symbol: 'x_n', meaning: 'Current root estimate' },
      { symbol: 'f(x_n)', meaning: 'Function value at x_n' },
      { symbol: 'f\'(x_n)', meaning: 'First derivative (tangent slope) at x_n' }
    ],
    description: 'Quadratic convergence root-finding algorithm using successive tangent line intercepts.',
    usageNotes: 'Order of convergence p = 2. Requires f\'(x_n) ≠ 0.',
    tags: ['roots', 'newton raphson', 'calculus', 'quadratic convergence']
  },
  {
    id: 'f-secant-method',
    unitId: 'unit2',
    topic: 'Secant Method',
    name: 'Secant Method Iteration Formula',
    latex: 'x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}',
    symbols: [
      { symbol: 'x_n, x_{n-1}', meaning: 'Two previous iterates' },
      { symbol: 'f(x_n), f(x_{n-1})', meaning: 'Corresponding function values' }
    ],
    description: 'Derivative-free root finding method approximating tangent slopes with secant lines.',
    usageNotes: 'Order of convergence p ≈ 1.618 (golden ratio).',
    tags: ['roots', 'secant', 'iterative', 'golden ratio']
  },
  {
    id: 'f-newton-forward-interp',
    unitId: 'unit2',
    topic: 'Newton\'s Forward Interpolation',
    name: 'Newton\'s Forward Difference Formula',
    latex: 'P_n(x) = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + \\dots',
    symbols: [
      { symbol: 'u', meaning: '(x - x_0) / h where h is the constant step size' },
      { symbol: '\\Delta y_0', meaning: 'First forward difference: y_1 - y_0' },
      { symbol: '\\Delta^k y_0', meaning: 'k-th forward difference from difference table' }
    ],
    description: 'Interpolates function values near the start of an equally spaced data table.',
    usageNotes: 'Best used when target x is located in the top portion of the table.',
    tags: ['interpolation', 'finite differences', 'newton forward', 'polynomials']
  },
  {
    id: 'f-lagrange-interp',
    unitId: 'unit2',
    topic: 'Lagrange\'s Interpolation',
    name: 'Lagrange Interpolating Polynomial',
    latex: 'P(x) = \\sum_{i=0}^n y_i \\prod_{j=0, j \\neq i}^n \\frac{x - x_j}{x_i - x_j}',
    symbols: [
      { symbol: '(x_i, y_i)', meaning: 'Discrete data points' },
      { symbol: 'L_i(x)', meaning: 'Lagrange basis polynomial equal to 1 at x_i and 0 at x_j' }
    ],
    description: 'Constructs the unique degree ≤ n interpolating polynomial for arbitrarily spaced points.',
    usageNotes: 'Does not require equal interval spacing h.',
    tags: ['interpolation', 'lagrange', 'polynomials', 'basis']
  },

  // UNIT 3: Operations Research
  {
    id: 'f-simplex-ratio',
    unitId: 'unit3',
    topic: 'Simplex Algorithm',
    name: 'Simplex Minimum Ratio Test (Leaving Variable)',
    latex: '\\theta = \\min_{i} \\left\\{ \\frac{b_i}{a_{ir}} \\;\\middle|\\; a_{ir} > 0 \\right\\}',
    symbols: [
      { symbol: 'b_i', meaning: 'Current right-hand side constant for row i' },
      { symbol: 'a_{ir}', meaning: 'Element in pivot column r for row i (must be strictly positive)' }
    ],
    description: 'Determines which basic variable leaves the basis to preserve feasibility (non-negativity).',
    usageNotes: 'Never divide by zero or negative pivot column entries.',
    tags: ['simplex', 'linear programming', 'pivot', 'ratio test']
  },
  {
    id: 'f-primal-dual',
    unitId: 'unit3',
    topic: 'Duality in Linear Programming',
    name: 'Symmetric Primal-Dual Matrix Canonical Form',
    latex: '\\text{Primal: Max } \\mathbf{c}^T \\mathbf{x} \\text{ s.t. } A\\mathbf{x} \\le \\mathbf{b}, \\mathbf{x} \\ge \\mathbf{0} \\iff \\text{Dual: Min } \\mathbf{b}^T \\mathbf{y} \\text{ s.t. } A^T \\mathbf{y} \\ge \\mathbf{c}, \\mathbf{y} \\ge \\mathbf{0}',
    symbols: [
      { symbol: '\\mathbf{c}', meaning: 'Primal objective coefficients' },
      { symbol: '\\mathbf{b}', meaning: 'Primal resource bounds' },
      { symbol: '\\mathbf{y}', meaning: 'Dual variables (shadow prices)' },
      { symbol: 'A^T', meaning: 'Transpose of the constraint coefficient matrix' }
    ],
    description: 'Defines the structural correspondence between primal and dual linear programs.',
    usageNotes: 'Strong Duality: If either has an optimal solution, Max Z* = Min W*.',
    tags: ['duality', 'shadow prices', 'linear programming', 'simplex']
  },
  {
    id: 'f-modi-optimality',
    unitId: 'unit3',
    topic: 'Transportation Problem',
    name: 'MODI (u-v) Method Multipliers & Optimality Test',
    latex: 'u_i + v_j = c_{ij} \\; (\\text{allocated cells}), \\quad d_{ij} = c_{ij} - (u_i + v_j) \\ge 0 \\; (\\text{unallocated cells})',
    symbols: [
      { symbol: 'u_i', meaning: 'Row dual multiplier for origin i' },
      { symbol: 'v_j', meaning: 'Column dual multiplier for destination j' },
      { symbol: 'c_{ij}', meaning: 'Unit transportation cost' },
      { symbol: 'd_{ij}', meaning: 'Net evaluation (opportunity cost)' }
    ],
    description: 'Optimality test for transportation schedules. If any d_{ij} < 0, total shipping cost can be reduced.',
    usageNotes: 'Requires exactly m + n - 1 basic allocations without closed loops.',
    tags: ['transportation', 'modi', 'optimality', 'operations research']
  },
  {
    id: 'f-game-minimax',
    unitId: 'unit3',
    topic: 'Game Theory',
    name: 'Minimax Theorem & Saddle Point Condition',
    latex: '\\max_i (\\min_j a_{ij}) = \\min_j (\\max_i a_{ij}) = V',
    symbols: [
      { symbol: '\\max_i \\min_j a_{ij}', meaning: 'Maximin: Player A\'s maximum guaranteed minimum payoff' },
      { symbol: '\\min_j \\max_i a_{ij}', meaning: 'Minimax: Player B\'s minimum conceded maximum loss' },
      { symbol: 'V', meaning: 'Value of the zero-sum game' }
    ],
    description: 'Condition under which a two-person zero-sum matrix game has an equilibrium pure strategy.',
    usageNotes: 'If Maximin = Minimax, pure strategies exist; if not, players must randomize with mixed strategies.',
    tags: ['game theory', 'minimax', 'saddle point', 'zero sum']
  },
  {
    id: 'f-game-2x2-mixed',
    unitId: 'unit3',
    topic: 'Game Theory',
    name: 'Analytical Formulas for 2x2 Mixed Strategy Game',
    latex: 'p_1 = \\frac{a_{22} - a_{21}}{(a_{11} + a_{22}) - (a_{12} + a_{21})}, \\quad V = \\frac{a_{11} a_{22} - a_{12} a_{21}}{(a_{11} + a_{22}) - (a_{12} + a_{21})}',
    symbols: [
      { symbol: 'p_1', meaning: 'Probability Player A chooses strategy 1 (p_2 = 1 - p_1)' },
      { symbol: 'a_{ij}', meaning: 'Payoff matrix elements [[a_11, a_12], [a_21, a_22]]' },
      { symbol: 'V', meaning: 'Game expected value' }
    ],
    description: 'Closed-form probabilities making opponents indifferent to their strategy choices.',
    usageNotes: 'Applies only when no pure saddle point exists.',
    tags: ['game theory', 'mixed strategies', 'probability', 'matrix games']
  },

  // UNIT 4: Lattices & Boolean Algebra
  {
    id: 'f-lattice-absorption',
    unitId: 'unit4',
    topic: 'Lattices as POSETs',
    name: 'Lattice Absorption Laws',
    latex: 'a \\land (a \\lor b) = a, \\quad a \\lor (a \\land b) = a',
    symbols: [
      { symbol: '\\land', meaning: 'Meet operation (greatest lower bound / infimum)' },
      { symbol: '\\lor', meaning: 'Join operation (least upper bound / supremum)' }
    ],
    description: 'Fundamental algebraic equations that define a lattice alongside commutativity and associativity.',
    usageNotes: 'Equivalently establishes consistency: a ≤ b <=> a ∧ b = a <=> a ∨ b = b.',
    tags: ['lattices', 'algebra', 'meet', 'join', 'poset']
  },
  {
    id: 'f-distributive-lattice',
    unitId: 'unit4',
    topic: 'Distributive Lattices',
    name: 'Distributive Laws in Lattices',
    latex: 'a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c), \\quad a \\lor (b \\land c) = (a \\lor b) \\land (a \\lor c)',
    symbols: [
      { symbol: 'a, b, c', meaning: 'Any three elements in lattice L' }
    ],
    description: 'Dual identities where meet distributes over join, and join distributes over meet.',
    usageNotes: 'By Birkhoff\'s theorem, L is distributive iff it contains neither N_5 (pentagon) nor M_3 (diamond) sublattices.',
    tags: ['distributive', 'birkhoff', 'sublattice', 'lattice axioms']
  },
  {
    id: 'f-boolean-demorgan',
    unitId: 'unit4',
    topic: 'Boolean Algebra',
    name: 'De Morgan\'s Laws in Boolean Algebra',
    latex: '(a \\land b)\' = a\' \\lor b\', \\quad (a \\lor b)\' = a\' \\land b\'',
    symbols: [
      { symbol: 'a\'', meaning: 'Boolean complement of element a' },
      { symbol: '\\land', meaning: 'Boolean AND / meet' },
      { symbol: '\\lor', meaning: 'Boolean OR / join' }
    ],
    description: 'Dual transformation rules converting between meet and join operations under complementation.',
    usageNotes: 'Foundational for logic gate conversions (NAND/NOR universality) and circuit minimization.',
    tags: ['boolean algebra', 'de morgan', 'logic', 'circuits', 'duality']
  },
  {
    id: 'f-stone-representation',
    unitId: 'unit4',
    topic: 'Stone\'s Representation Theorem',
    name: 'Cardinality and Power Set Isomorphism (Stone\'s Theorem)',
    latex: '|B| = 2^k \\quad (k = |\\text{Atoms}(B)|), \\quad B \\cong \\mathcal{P}(\\text{Atoms}(B))',
    symbols: [
      { symbol: 'B', meaning: 'Finite Boolean algebra' },
      { symbol: 'k', meaning: 'Number of atoms (elements that cover 0)' },
      { symbol: '\\mathcal{P}(S)', meaning: 'Power set (set of all subsets of S)' }
    ],
    description: 'Asserts that every finite Boolean algebra is isomorphic to the power set of its atomic elements.',
    usageNotes: 'Proves that the size of any finite Boolean algebra must be a power of 2 (1, 2, 4, 8, 16...).',
    tags: ['stone representation', 'atoms', 'isomorphism', 'power set', 'cardinality']
  }
];
