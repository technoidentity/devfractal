import { DTBody, DTCell, DTHead, DTHeader, DTRow, DTable } from '@srtp/ui'

export function DivTable() {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <DTable>
        <DTHeader>
          <DTRow>
            <DTHead>King's Treasury</DTHead>
            <DTHead>People's happiness</DTHead>
          </DTRow>
        </DTHeader>
        <DTBody>
          <DTRow>
            <DTCell>Empty</DTCell>
            <DTCell>Overflowing</DTCell>
          </DTRow>
          <DTRow>
            <DTCell>Modest</DTCell>
            <DTCell>Satisfied</DTCell>
          </DTRow>
          <DTRow>
            <DTCell>Half</DTCell>
            <DTCell>Happy</DTCell>
          </DTRow>
          <DTRow>
            <DTCell>Full</DTCell>
            <DTCell>Ecstatic</DTCell>
          </DTRow>
        </DTBody>
      </DTable>
    </div>
  )
}
