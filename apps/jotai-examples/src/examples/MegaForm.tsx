/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { signal, useAction, useValue } from '@srtp/jotai'
import { PrimitiveAtom, useAtom } from 'jotai'
import { Provider } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { splitAtom, useAtomCallback } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import { initialValue } from './initialValue'

function useAtomSlice<Item>(arrAtom: PrimitiveAtom<Item[]>) {
  const [atoms, remove] = useAtom(useMemo(() => splitAtom(arrAtom), [arrAtom]))
  return useMemo(
    () => atoms.map(itemAtom => [itemAtom, () => remove(itemAtom)] as const),
    [atoms, remove],
  )
}

const Field = ({
  fieldAtom,
  removeField,
}: {
  fieldAtom: PrimitiveAtom<{ name: string; value: string }>
  removeField: () => void
}) => {
  const nameAtom = useMemo(
    () => focusAtom(fieldAtom, o => o.prop('name')),
    [fieldAtom],
  )
  const valueAtom = useMemo(
    () => focusAtom(fieldAtom, o => o.prop('value')),
    [fieldAtom],
  )
  const name = useValue(nameAtom)
  const setName = useAction(nameAtom)
  const value = useValue(valueAtom)
  const setValue = useAction(valueAtom)

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={removeField}>X</button>
    </div>
  )
}

const Form = ({
  formAtom,
  nameAtom,
  remove,
}: {
  formAtom: PrimitiveAtom<Record<string, string>>
  nameAtom: PrimitiveAtom<string>
  remove: () => void
}) => {
  const objectsAtom = useMemo(
    () =>
      focusAtom(formAtom, o =>
        o.iso(
          bigObject =>
            Object.entries(bigObject).map(([name, value]) => ({
              name,
              value,
            })),
          arrayOfObjects =>
            Object.fromEntries(
              arrayOfObjects.map(({ name, value }) => [name, value]),
            ),
        ),
      ),
    [formAtom],
  )

  const fieldAtoms = useAtomSlice(objectsAtom)
  const name = useValue(nameAtom)
  const setName = useAction(nameAtom)

  const addField = useAtomCallback(
    useCallback(
      (get, set) => {
        const id = Math.floor(Math.random() * 1000)
        set(objectsAtom, oldValue => [
          ...oldValue,
          { name: `new field ${id}`, value: '' },
        ])
      },
      [objectsAtom],
    ),
  )

  return (
    <div>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={remove}>Remove form</button>
      </div>

      <ul>
        {fieldAtoms.map(([fieldAtom, remove]) => (
          <li key={fieldAtom.toString()}>
            <Field fieldAtom={fieldAtom} removeField={remove} />
          </li>
        ))}
      </ul>
      <button onClick={addField}>Add field</button>
    </div>
  )
}

const FormList = ({
  formListAtom,
}: {
  formListAtom: PrimitiveAtom<Record<string, Record<string, string>>>
}) => {
  const entriesAtom = useMemo(
    () =>
      focusAtom(formListAtom, o =>
        o.iso(
          obj => Object.entries(obj),
          array => Object.fromEntries(array),
        ),
      ),
    [formListAtom],
  )
  const formAtoms = useAtomSlice(entriesAtom)

  const addForm = useAtomCallback(
    useCallback(
      (get, set) => {
        const id = Math.floor(Math.random() * 1000)
        set(entriesAtom, oldValue => [...oldValue, [`new form ${id}`, {}]])
      },
      [entriesAtom],
    ),
  )

  const formValues = useMemo(() => {
    return formAtoms.map(([formEntryAtom, remove]) => ({
      nameAtom: focusAtom(formEntryAtom, o => o.nth(0)),
      formAtom: focusAtom(formEntryAtom, o => o.nth(1)),
      remove,
    }))
  }, [formAtoms])
  return (
    <ul>
      {formValues.map(({ nameAtom, formAtom, remove }) => (
        <li key={nameAtom.toString()}>
          <Form nameAtom={nameAtom} formAtom={formAtom} remove={remove} />
        </li>
      ))}

      <button onClick={addForm}>Add new form</button>
    </ul>
  )
}

const formListAtom = signal(initialValue)

export function App() {
  return (
    <Provider>
      <h1>Mega form</h1>
      <FormList formListAtom={formListAtom} />
    </Provider>
  )
}
