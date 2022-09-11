package main

import (
	"fmt"
	"os/exec"
	"time"
)

func main() {
	fmt.Println("Dentro del server de go\nLeyendo modulo cpu\n")

	for true {
		cmd := exec.Command("sh", "-c", "cat /proc/ram_201408419")
		salida, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		json := string(salida[:])
		fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
		fmt.Println(json)

		cmd = exec.Command("sh", "-c", "cat /proc/cpu_201408419")
		salida, err = cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		json = string(salida[:])
		fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
		fmt.Println(json)

		time.Sleep(10 * time.Second)
	}

}
