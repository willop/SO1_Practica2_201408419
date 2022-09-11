package main

import (
	"fmt"
	"os/exec"
)

func main() {
	fmt.Println("Dentro del server de go\nLeyendo modulo cpu\n")

	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	fmt.Println(json)
}
