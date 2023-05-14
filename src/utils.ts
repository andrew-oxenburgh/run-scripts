import path from 'path'
import fs from 'fs'

interface PackageType {
    scripts: [Record<string, number>]
    engines: [Record<string, number>]
}

export function readFile (name): string {
    const filepath = path.resolve(process.cwd(), name)
    return fs.readFileSync(filepath, 'utf8')
}
export function readObjectFromFile (name: string): object {
    const contents = readFile(name)
    return JSON.parse(contents)
}

export function readPackageFile (): Partial<PackageType> {
    const contents = readFile('package.json')
    return JSON.parse(contents)
}

export function readArrayFromFile (name: string): string[] {
    const text = readFile(name)
    return text.split('\n')
}
