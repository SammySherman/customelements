# Custom Components

## To create a new component
Run the generate component script with the name of the component
as a parameter. _Use camelCase to avoid issues_.
```shell script
generate-component.sh button
```
The command above will create a directory called Button, set up npm, 
and generate the boilerplate for a component.

## To build a component
Navigate to the directory for the component you wish to build then run.
```shell script
npx webpack
```

## To use a component
First, [build the component](#To-build-a-component). Then, import the script in your html file.
```xhtml
<script src="Button/dist/main.js"></script>
```
Then simply use the component like any other html element.
```
<kg-button appearance="outline" color="primary">Primary</kg-button>
```