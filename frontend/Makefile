.PHONY: up down logs build

up:
	docker compose up -d

down:
	docker compose down --remove-orphans

logs:
	docker compose logs -f

build:
	docker compose up -d --build
