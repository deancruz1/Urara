import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <section className="wrap pt-14">
        <h1 className="m-0 border-b-[3px] border-ink pb-1.5 font-cond text-4xl font-extrabold uppercase leading-none">
          Something went wrong
        </h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 h-11 cursor-pointer bg-ink px-5 font-bold text-paper"
        >
          Reload page
        </button>
      </section>
    );
  }
}
