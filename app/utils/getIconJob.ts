export default function getJobIcon(
    jobs: { name: string; url: string }[],
    job: string
): string {
    const searchIcon = jobs.find(element => element.name === job)

    return searchIcon?.url ?? ''
}