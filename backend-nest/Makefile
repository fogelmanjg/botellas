.PHONY: up down logs build migration-run migration-revert

up:
	docker compose up -d

down:
	docker compose down --remove-orphans

logs:
	docker compose logs -f

build:
	docker compose up -d --build

migration-run:
	docker compose exec backend npm run migration:run

migration-revert:
	docker compose exec backend npm run migration:revert
