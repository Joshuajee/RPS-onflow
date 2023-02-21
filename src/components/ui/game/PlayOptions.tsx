import OptionCard from "./OptionCard"

interface IProps {
    setOption: (val: number) => void
}

const PlayOptions = ({ setOption } : IProps) => {

    return  (
        <div className="flex justify-between w-full max-w-xl">

            <OptionCard onClick={() => setOption(0)}>
                ROCK
            </OptionCard>

            <OptionCard onClick={() => setOption(1)}>
                Paper
            </OptionCard>

            <OptionCard onClick={() => setOption(2)}>
                Scissors
            </OptionCard>


        </div>
    )

}

export default PlayOptions
