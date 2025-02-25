import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1677654321987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const testUserId = '550e8400-e29b-41d4-a716-446655440000';
    await queryRunner.query(
      `
      INSERT INTO users (id, email, password)
      VALUES ($1, 'test@example.com', '$2b$10$XURPShlXNbqiIxgY12z4KuhJZp3trcW.KFDFK5fKnXdfRs3ZsG8fO')
      ON CONFLICT (email) DO NOTHING;
    `,
      [testUserId],
    );

    const countries = [
      'Australia',
      'Brazil',
      'Canada',
      'Denmark',
      'Egypt',
      'France',
      'Germany',
      'Hungary',
      'India',
      'Japan',
      'Kenya',
      'Luxembourg',
      'Mexico',
      'Netherlands',
      'Norway',
      'Poland',
      'Qatar',
      'Russia',
      'Spain',
      'Sweden',
      'Thailand',
      'Ukraine',
      'United Kingdom',
      'United States',
      'Vietnam',
      'Argentina',
      'Belgium',
      'Chile',
      'Italy',
      'South Africa',
    ];

    for (const name of countries) {
      await queryRunner.query(
        `
          INSERT INTO countries (id, name, "createdAt", "createdById")
          VALUES (uuid_generate_v4(), $1, NOW(), $2);
      `,
        [name, testUserId],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const testUserId = '550e8400-e29b-41d4-a716-446655440000';
    await queryRunner.query(
      `
      DELETE FROM countries WHERE "createdById" = $1;
    `,
      [testUserId],
    );

    await queryRunner.query(
      `
        DELETE FROM users WHERE id = $1;
    `,
      [testUserId],
    );
  }
}
