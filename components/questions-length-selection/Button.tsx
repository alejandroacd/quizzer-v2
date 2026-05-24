export const Button = ({content}: {content: string | number}) => {
    return    <button
          className="px-12 py-8 rounded-md border bg-secondary font-bold text-1xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        >
          {content}
        </button>
}