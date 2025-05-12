export const Input = ({icon:Icon,...props}) => {
  return (
    <div class='relative mb-6 flex items-center justify-center'>
        <div class=' inset-y-0 left-0 pl-3 pointer-events-none'>
            <Icon class='size-5 text-white mr-8'/>
        </div>
        <input
            
            {...props}
            class='w-2/3 pl-5 pr-3 py-2 bg-black border border-transparent hover:placeholder-white hover:border-white border-b-gray-600 focus:ring-2 text-white placeholder-gray-600 focus:placeholder-white transition duration-200'
        />
    </div>
  )
}
