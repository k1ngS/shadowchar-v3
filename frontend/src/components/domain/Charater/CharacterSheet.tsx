import React, { useState, useEffect } from 'react';
import type { Character, CharacterCreate } from '../../../types'; // Usando os tipos do index.ts
import { rollDice } from '../../../utils/diceRoller'; // Importa a função de rolagem de dados
import { useForm } from 'react-hook-form';

interface CharacterSheetProps {
  character: Character;
  onUpdate: (payload: Partial<CharacterCreate>) => void;
  isUpdating: boolean;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onUpdate, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<Partial<CharacterCreate>>({
    defaultValues: character,
  });

  useEffect(() => {
    reset(character);
  }, [character, reset]);

  const onSubmit = (data: Partial<CharacterCreate>) => {
    onUpdate(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Ficha de {character.name}</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar Ficha
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty || isUpdating}
              className={`py-2 px-4 rounded font-bold ${isDirty && !isUpdating ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            >
              {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              onClick={() => {
                reset(character); // Reset form to original character data
                setIsEditing(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Seção de Informações Básicas */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Informações Básicas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Nome:</label>
              {isEditing ? (
                <input type="text" {...register("name")} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Ancestralidade:</label>
              {isEditing ? (
                <input type="text" {...register("ancestry")} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.ancestry}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Background:</label>
              {isEditing ? (
                <input type="text" {...register("background")} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.background}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Profissão:</label>
              {isEditing ? (
                <input type="text" {...register("profession")} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.profession}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Nível:</label>
              {isEditing ? (
                <input type="number" {...register("level", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.level}</p>
              )}
            </div>
          </div>
        </div>

        {/* Seção de Atributos */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Atributos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[ "strength", "agility", "intellect", "will"].map((attr) => (
              <div key={attr}>
                <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">{attr}:</label>
                {isEditing ? (
                  <input type="number" {...register(attr as keyof Partial<CharacterCreate>, { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                ) : (
                  <p className="text-gray-900">{character[attr as keyof Character]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Status */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Vida Atual:</label>
              {isEditing ? (
                <input type="number" {...register("current_health", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.current_health}/{character.health}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Taxa de Cura:</label>
              {isEditing ? (
                <input type="number" {...register("healing_rate", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.healing_rate}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Defesa:</label>
              {isEditing ? (
                <input type="number" {...register("defense", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.defense}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Tamanho:</label>
              {isEditing ? (
                <input type="text" {...register("size")} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.size}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Velocidade:</label>
              {isEditing ? (
                <input type="number" {...register("speed", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.speed}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Poder:</label>
              {isEditing ? (
                <input type="number" {...register("power", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.power}</p>
              )}
            </div>
          </div>
        </div>

        {/* Seção de Insanidade e Corrupção */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Sanidade e Corrupção</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Insanidade:</label>
              {isEditing ? (
                <input type="number" {...register("insanity", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.insanity}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Corrupção:</label>
              {isEditing ? (
                <input type="number" {...register("corruption", { valueAsNumber: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
              ) : (
                <p className="text-gray-900">{character.corruption}</p>
              )}
            </div>
          </div>
        </div>

        {/* Seção de Notas */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Notas</h3>
          {isEditing ? (
            <textarea {...register("notes")} rows={5} className="shadow border rounded w-full py-2 px-3 text-gray-700"></textarea>
          ) : (
            <p className="text-gray-900 whitespace-pre-wrap">{character.notes}</p>
          )}
        </div>

        {/* Seções de Linguagens, Profissões/Perícias, Talentos, Magias, Equipamentos - simplificadas para o exemplo */}
        {/* Para uma implementação completa, cada uma dessas seções precisaria de seus próprios componentes de lista/edição */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Linguagens</h3>
          {!isEditing ? (
            <ul className="list-disc list-inside">
              {character.languages?.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Funcionalidade de edição de linguagens a ser implementada.</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Profissões e Perícias</h3>
          {!isEditing ? (
            <ul className="list-disc list-inside">
              {character.professions_skills?.map((ps, index) => (
                <li key={index}>{ps}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Funcionalidade de edição de profissões e perícias a ser implementada.</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Talentos</h3>
          {!isEditing ? (
            <ul className="list-disc list-inside">
              {character.talents?.map((talent: any, index: number) => (
                <li key={index}>{talent.name} - {talent.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Funcionalidade de edição de talentos a ser implementada.</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Magias</h3>
          {!isEditing ? (
            <ul className="list-disc list-inside">
              {character.spells?.map((spell: any, index: number) => (
                <li key={index}>{spell.name} ({spell.type}) - {spell.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Funcionalidade de edição de magias a ser implementada.</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Equipamento</h3>
          {!isEditing ? (
            <ul className="list-disc list-inside">
              {character.equipment?.map((item: any, index: number) => (
                <li key={index}>{item.name} (x{item.quantity}) - {item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Funcionalidade de edição de equipamento a ser implementada.</p>
          )}
        </div>

      </form>

      {/* Seção de Rolagem de Dados e Ações */}
      <div className="md:col-span-2 mt-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Ações e Rolagens</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Rolar Dano (ex: 1d6):</label>
            <input
              type="text"
              id="damageRollInput"
              placeholder="Ex: 1d6"
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
            />
            <button
              onClick={() => {
                const damageRollInput = document.getElementById("damageRollInput") as HTMLInputElement;
                const diceNotation = damageRollInput?.value || "";
                try {
                  const rollResult = rollDice(diceNotation);
                  alert(`Você rolou ${rollResult} de dano!`);
                } catch (e: any) {
                  alert(`Erro ao rolar dano: ${e.message}`);
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Rolar Dano
            </button>
          </div>
          {/* Adicione mais botões de rolagem conforme necessário (ex: atributos, testes de perícia) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Ações de Personagem:</label>
            <button
              onClick={() => alert("Funcionalidade de ação de personagem a ser implementada.")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Realizar Ação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;