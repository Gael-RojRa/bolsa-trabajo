<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddRequirementsColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar si la columna ya existe para evitar errores
        $columnExists = DB::select("
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'offers' 
            AND COLUMN_NAME = 'requirements'
        ");
        
        if (empty($columnExists)) {
            // La columna no existe, la agregamos
            DB::statement('ALTER TABLE offers ADD COLUMN requirements TEXT NULL AFTER description');
            $this->command->info('Columna requirements agregada correctamente.');
        } else {
            $this->command->info('La columna requirements ya existe en la tabla offers.');
        }
    }
}
