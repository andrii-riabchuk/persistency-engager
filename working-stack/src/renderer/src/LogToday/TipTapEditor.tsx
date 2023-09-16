import './styles.scss'

import Highlight from '@tiptap/extension-highlight'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'

import PlaceHolder from '@tiptap/extension-placeholder'

import { EditorContent, createDocument, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import { EditorState } from 'prosemirror-state'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { useEffect } from 'react'
import MenuBar from './Menu'

const extensions = [
  //   StarterKit,
  Document,
  Paragraph,
  Text,
  Highlight.configure({ multicolor: true }),
  History.configure({ newGroupDelay: 500 }),
  Bold.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-b': () => this.editor.chain().focus().toggleBold().run()
      }
    }
  }),
  Italic.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-i': () => this.editor.chain().focus().setItalic().focus('end').toggleItalic().run()
      }
    }
  }),
  Strike,

  BulletList.configure({
    itemTypeName: 'listItem'
  }),
  OrderedList,
  Blockquote,
  ListItem,
  PlaceHolder
]

export default function TipTapEditor({ _content, setLogContentState, readOnly, renameMe }) {
  const editor = useEditor({
    extensions: extensions,
    content: _content,
    onUpdate({ editor }) {
      console.log('updated', editor.getHTML())
      setLogContentState(editor.getHTML())
      //   setLogContentState(editor)
    }
  })
  renameMe.current = editor

  useEffect(() => {
    if (editor) {
      console.log(editor)
      const newState = EditorState.create({
        doc: createDocument(_content, editor.schema),
        schema: editor.schema,
        plugins: editor.state.plugins
      })
      editor.view.updateState(newState)

      editor.commands.setContent(_content)
      editor.setEditable(!readOnly)
    }
  }, [_content, readOnly])

  return (
    <div
      className="tiptap-editor"
      onClick={() => {
        if (!editor?.isFocused) editor?.commands.focus('end')
      }}
    >
      <MenuBar editor={editor} readOnly={readOnly} />
      <EditorContent editor={editor} ref={renameMe} />
    </div>
  )
}
