# Build commands for Evolution_Platform

default:
	@echo "Available commands:"
	@echo "  just dev         - Start development server"
	@echo "  just build       - Build for production"
	@echo "  just check       - Run type-check and build"
	@echo "  just clean       - Clean build artifacts"

dev:
	npm run dev

build:
	npm run build

check:
	@echo "🔍 Running Evolution_Platform checks..."
	@echo "  → Type-checking..."
	npx tsc --noEmit
	@echo "  → Building..."
	npm run build
	@echo "✅ All checks passed"

clean:
	rm -rf .next dist
