import GoogleSignInButton from './GoogleSignInButton';

type PanelProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

export function ThreePanel({ panels }: { panels: PanelProps[] }) {
  return (
    <div className="space-y-12">
      <div className="grid gap-12 md:grid-cols-3">
        {panels.map((p, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="text-primary text-4xl mb-4">{p.icon}</div>
            <h3 className="text-xl font-heading font-semibold text-white mb-2">
              {p.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
      
      <div className="pt-8 border-t border-gray-700">
        <div className="text-center">
          <p className="text-white mb-4">Sign in to access exclusive content</p>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
