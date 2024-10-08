import { Fragment } from 'react'
interface Contributor {
    name: string;
    rank: number;
    score: number;
}

interface LeaderboardProps {
    data: Contributor[];
}
// const locations = [
//     {
//         country: 'Philippines',
//         people: [
//             { contributor: 'CAIR', rank: 1, score: 100 },
//         ],
//     },
// ]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Leaderboard({ data }: LeaderboardProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full">
                            <thead className="bg-white">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                        Rank
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Institution/Contributor
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Score
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <Fragment>
                                    {data.map((contributor, contributorIdx) => (
                                        <tr
                                            key={contributor.name}
                                            className={classNames(contributorIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-3">
                                                {contributor.rank}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{contributor.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contributor.score}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <a href={`#`} className="text-indigo-600 hover:text-indigo-900">
                                                    View data<span className="sr-only">, {contributor.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </Fragment>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
