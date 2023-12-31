import { useEffect, useState } from 'react'

import icons from '../assets/remixicon.symbol.d4b9d612.svg'
import copyTextIcon from '../assets/copy-text-svgrepo-com.svg'

export default function MenuBar({ editor, readOnly }) {
  let [disabled, setDisabled] = useState(readOnly)

  useEffect(() => {
    setDisabled(readOnly)
  }, [readOnly])

  return (
    <div
      className="editor-header"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <button
        onClick={() => {
          if (editor) {
            // TODO_IF_NEEDED: next text is plain after applying some formating option on selection
            // const { view, state } = editor
            // const { from, to } = view.state.selection
            // console.log('selected text between', from, to)

            editor.chain().focus().toggleBold().run()
          }
        }}
        className="menu-item"
        title="Bold"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-bold`} />
        </svg>
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className="menu-item"
        title="Italic"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-italic`} />
        </svg>
      </button>
      <button
        onClick={() => {
          editor?.chain().focus().toggleStrike().run()
        }}
        className="menu-item"
        title="Strike"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-strikethrough`} />
        </svg>
      </button>
      {/* <button className="menu-item" title="Code">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-code-view"></use>
        </svg>
      </button> */}
      <button
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
        className="menu-item"
        title="Highlight"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-mark-pen-line`} />
        </svg>
      </button>

      <div className="divider"></div>

      {/* <button className="menu-item" title="Heading 1">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-h-1"></use>
        </svg>
      </button>
      <button className="menu-item" title="Heading 2">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-h-2"></use>
        </svg>
      </button>
      <button className="menu-item" title="Paragraph">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-paragraph"></use>
        </svg>
      </button> */}
      <button
        onClick={() => editor?.chain().toggleBulletList().run()}
        className="menu-item"
        title="Bullet List"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-list-unordered`} />
        </svg>
      </button>
      <button
        onClick={() => editor?.chain().toggleOrderedList().run()}
        className="menu-item"
        title="Ordered List"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-list-ordered`} />
        </svg>
      </button>
      {/* <button className="menu-item" title="Task List">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-list-check-2"></use>
        </svg>
      </button> */}
      {/* <button className="menu-item" title="Code Block">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-double-quotes-l"></use>
        </svg>
      </button> */}
      <button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className="menu-item"
        title="Blockquote"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-separator`} />
        </svg>
      </button>
      {/* <button className="menu-item" title="Horizontal Rule">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-text-wrap"></use>
        </svg>
      </button> */}
      {/* <button className="menu-item" title="Hard Break">
        <svg className="remix">
          <use xlinkHref="/src/assets/remixicon.symbol.d4b9d612.svg#ri-code-box-line"></use>
        </svg>
      </button> */}
      <div className="divider"></div>

      <button
        onClick={() => {
          if (editor) {
            editor.chain().focus().unsetBold().unsetItalic().unsetHighlight().unsetStrike().run()
          }
        }}
        className="menu-item"
        title="Clear Format"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-format-clear`} />
        </svg>
      </button>

      <div className="divider"></div>

      <button
        onClick={() => editor?.chain().undo().run()}
        className="menu-item"
        title="Undo"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-arrow-go-back-line`} />
        </svg>
      </button>
      <button
        onClick={() => editor?.chain().redo().run()}
        className="menu-item"
        title="Redo"
        disabled={disabled}
      >
        <svg className="remix">
          <use xlinkHref={`${icons}#ri-arrow-go-forward-line`} />
        </svg>
      </button>
      <button
        onClick={() => {
          let text = editor?.getText()
          navigator.clipboard.writeText(text)
        }}
        className="menu-item copy-button"
      >
        <svg className="copy-button_icon">
          <use xlinkHref={`${copyTextIcon}#Capa_1`} />
        </svg>
      </button>
    </div>
  )
}
