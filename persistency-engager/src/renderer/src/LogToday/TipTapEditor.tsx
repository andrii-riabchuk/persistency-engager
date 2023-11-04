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

import { Editor, EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import MenuBar from './Menu'
import {
  selectFocusEditorState,
  setFocusEditorState,
  setLogContentEditable
} from '@renderer/features/contribution-calendar/contributionCalendarSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { MutableRefObject, useEffect } from 'react'
import { setShouldFocusEditor, shouldFocusEditor } from '@renderer/features/logToday/logTodaySlice'

const extensions = [
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

interface TipTapEditorProps {
  logContent: string
  readOnly: boolean
  refForAutoFocus: MutableRefObject<Editor | null>
  onSubmit: () => void
}

export default function TipTapEditor({
  logContent,
  readOnly,
  refForAutoFocus,
  onSubmit
}: TipTapEditorProps) {
  const dispatch = useAppDispatch()
  const focusEditor = useAppSelector(selectFocusEditorState)

  // const logContentEditable = useAppSelector(selectLogContentEditable)
  // console.log(`TipTapEditor -[${logContent}]; editable[${!readOnly}]`)

  const editor = useEditor(
    {
      extensions: extensions,
      content: logContent,
      onUpdate({ editor }) {
        dispatch(setLogContentEditable(editor.getHTML()))
        console.log('tiptap onUpdate', editor.getHTML())
      },
      editable: !readOnly
    },
    [logContent, readOnly]
  )
  refForAutoFocus.current = editor

  if (focusEditor) {
    // setTimeout(() => editor?.commands.focus('end'), 1000)
    editor?.commands.focus('end')
    dispatch(setFocusEditorState(false))
  }

  useEffect(() => {
    console.log('adding new content to tiptapEditor', logContent, focusEditor)
    if (focusEditor) {
      // setTimeout(() => editor?.commands.focus('end'), 1000)
      editor?.commands.focus('end')
      // dispatch(setShouldFocusEditor(false))
    }
  }, [logContent])

  // if (focusEditor) {
  //   editor?.commands.focus('end')
  //   dispatch(setShouldFocusEditor(false))
  // }

  return (
    <div
      className="tiptap-editor"
      onClick={() => {
        if (!editor?.isFocused) editor?.commands.focus('end')
      }}
      onKeyDown={(event) => {
        if (event.ctrlKey && event.key == 'Enter') {
          simulateVisualButtonClick()
          onSubmit()
        }
      }}
    >
      <MenuBar editor={editor} readOnly={readOnly} />
      <EditorContent editor={editor} ref={refForAutoFocus} />
    </div>
  )
}

function simulateVisualButtonClick() {
  const logButtonElement = document.getElementById('log-button')
  if (!logButtonElement) return

  function setOpacity(value) {
    if (logButtonElement && logButtonElement.style) logButtonElement.style.opacity = value
  }

  const currentVal = logButtonElement.style.opacity
  setTimeout(() => {
    setOpacity(currentVal)
  }, 100)
  setOpacity(1)
}
