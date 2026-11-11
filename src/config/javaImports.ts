export interface JavaImport {
  simpleName: string;
  fullPath: string;
  description: string;
}

export const JAVA_IMPORTS: JavaImport[] = [
  // java.util — collections
  { simpleName: 'ArrayList',       fullPath: 'java.util.ArrayList',       description: 'Resizable array list' },
  { simpleName: 'LinkedList',      fullPath: 'java.util.LinkedList',      description: 'Doubly-linked list / deque' },
  { simpleName: 'HashMap',         fullPath: 'java.util.HashMap',         description: 'Hash table map' },
  { simpleName: 'LinkedHashMap',   fullPath: 'java.util.LinkedHashMap',   description: 'Insertion-ordered map' },
  { simpleName: 'TreeMap',         fullPath: 'java.util.TreeMap',         description: 'Sorted map (red-black tree)' },
  { simpleName: 'HashSet',         fullPath: 'java.util.HashSet',         description: 'Hash set' },
  { simpleName: 'LinkedHashSet',   fullPath: 'java.util.LinkedHashSet',   description: 'Insertion-ordered set' },
  { simpleName: 'TreeSet',         fullPath: 'java.util.TreeSet',         description: 'Sorted set (red-black tree)' },
  { simpleName: 'PriorityQueue',   fullPath: 'java.util.PriorityQueue',   description: 'Priority queue (min-heap by default)' },
  { simpleName: 'ArrayDeque',      fullPath: 'java.util.ArrayDeque',      description: 'Resizable array deque' },
  { simpleName: 'Stack',           fullPath: 'java.util.Stack',           description: 'LIFO stack (prefer ArrayDeque)' },

  // java.util — interfaces
  { simpleName: 'List',            fullPath: 'java.util.List',            description: 'Ordered collection interface' },
  { simpleName: 'Map',             fullPath: 'java.util.Map',             description: 'Key-value map interface' },
  { simpleName: 'Set',             fullPath: 'java.util.Set',             description: 'No-duplicate set interface' },
  { simpleName: 'Queue',           fullPath: 'java.util.Queue',           description: 'FIFO queue interface' },
  { simpleName: 'Deque',           fullPath: 'java.util.Deque',           description: 'Double-ended queue interface' },
  { simpleName: 'Iterator',        fullPath: 'java.util.Iterator',        description: 'Collection iterator' },
  { simpleName: 'Comparator',      fullPath: 'java.util.Comparator',      description: 'Comparison function interface' },

  // java.util — utilities
  { simpleName: 'Arrays',          fullPath: 'java.util.Arrays',          description: 'Array utility methods (sort, fill, copyOf…)' },
  { simpleName: 'Collections',     fullPath: 'java.util.Collections',     description: 'Collection utility methods' },
  { simpleName: 'Objects',         fullPath: 'java.util.Objects',         description: 'Object utility methods' },
  { simpleName: 'Optional',        fullPath: 'java.util.Optional',        description: 'Container for an optional value' },
  { simpleName: 'Scanner',         fullPath: 'java.util.Scanner',         description: 'Read tokenized input from stdin / string' },

  // java.util.stream
  { simpleName: 'Stream',          fullPath: 'java.util.stream.Stream',          description: 'Lazy sequence of elements' },
  { simpleName: 'IntStream',       fullPath: 'java.util.stream.IntStream',       description: 'Primitive int stream' },
  { simpleName: 'LongStream',      fullPath: 'java.util.stream.LongStream',      description: 'Primitive long stream' },
  { simpleName: 'DoubleStream',    fullPath: 'java.util.stream.DoubleStream',    description: 'Primitive double stream' },
  { simpleName: 'Collectors',      fullPath: 'java.util.stream.Collectors',      description: 'Terminal stream collectors' },

  // java.util.function
  { simpleName: 'Function',        fullPath: 'java.util.function.Function',        description: 'Single-argument function (T → R)' },
  { simpleName: 'BiFunction',      fullPath: 'java.util.function.BiFunction',      description: 'Two-argument function (T, U → R)' },
  { simpleName: 'Predicate',       fullPath: 'java.util.function.Predicate',       description: 'Boolean-valued function (T → boolean)' },
  { simpleName: 'BiPredicate',     fullPath: 'java.util.function.BiPredicate',     description: 'Two-argument predicate (T, U → boolean)' },
  { simpleName: 'Consumer',        fullPath: 'java.util.function.Consumer',        description: 'Single-argument void operation' },
  { simpleName: 'BiConsumer',      fullPath: 'java.util.function.BiConsumer',      description: 'Two-argument void operation' },
  { simpleName: 'Supplier',        fullPath: 'java.util.function.Supplier',        description: 'No-argument value supplier' },
  { simpleName: 'UnaryOperator',   fullPath: 'java.util.function.UnaryOperator',   description: 'Function where in/out types match (T → T)' },
  { simpleName: 'BinaryOperator',  fullPath: 'java.util.function.BinaryOperator',  description: 'Two-argument operator (T, T → T)' },

  // java.util.regex
  { simpleName: 'Pattern',         fullPath: 'java.util.regex.Pattern',   description: 'Compiled regular expression' },
  { simpleName: 'Matcher',         fullPath: 'java.util.regex.Matcher',   description: 'Regex matching engine' },

  // java.math
  { simpleName: 'BigInteger',      fullPath: 'java.math.BigInteger',      description: 'Arbitrary-precision integer' },
  { simpleName: 'BigDecimal',      fullPath: 'java.math.BigDecimal',      description: 'Arbitrary-precision decimal' },

  // java.io
  { simpleName: 'BufferedReader',  fullPath: 'java.io.BufferedReader',    description: 'Buffered character input reader' },
  { simpleName: 'InputStreamReader', fullPath: 'java.io.InputStreamReader', description: 'Byte-to-char input stream bridge' },
  { simpleName: 'PrintWriter',     fullPath: 'java.io.PrintWriter',       description: 'Formatted text output writer' },
  { simpleName: 'IOException',     fullPath: 'java.io.IOException',       description: 'Signals an I/O exception' },

  // java.util.concurrent
  { simpleName: 'AtomicInteger',      fullPath: 'java.util.concurrent.atomic.AtomicInteger',  description: 'Thread-safe integer' },
  { simpleName: 'AtomicLong',         fullPath: 'java.util.concurrent.atomic.AtomicLong',     description: 'Thread-safe long' },
  { simpleName: 'ConcurrentHashMap',  fullPath: 'java.util.concurrent.ConcurrentHashMap',     description: 'Thread-safe hash map' },
];
