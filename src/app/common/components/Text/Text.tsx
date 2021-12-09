const variants = {
  sub: 'text-gray-400 text-xs',
  base: 'text-gray-400 text-base',
  title: 'text-gray-400 text-lg',
} as const;

type Props = {
  variant?: keyof typeof variants;
  children: string;
}

export default function Text(props: Props) {
  const { children, variant = 'base' } = props;

  if (variant === 'title') {
    return <h2 className={`${variants.title}`}>{children}</h2>;
  }

  return <p className={`${variants[variant]}`}>{children}</p>;
}
