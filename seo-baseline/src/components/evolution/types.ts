export type EvolutionJoinProps = {
  campaign: string;
  placeholder?: string;
  successText?: string;
  onSubmit: (email: string) => Promise<void>;
  width?: 'sm' | 'md' | 'lg';
};
