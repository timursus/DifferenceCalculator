install:
		npm ci

build:
		rm -rf dist
		npm run build

lint:
		npx eslint .

test:
		npm test

test-coverage:
		npm test -- --coverage

publish:
		npm publish --dry-run